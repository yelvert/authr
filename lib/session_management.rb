module SessionManagement
  class Middleware
    RACK_SESSION_ID = "rack.session.id"

    attr_reader :app, :store, :schemes, :response

    def initialize(app, options = {})
      @app = app
      raise "SessionManagement options[:store] must be [ StoreClass, store_options_hash ]" unless options[:store].is_a?(Array) && options[:store].count == 2
      @store = options[:store][0].new(options[:store][1], self)
      @schemes = (options[:schemes] || []).map { |x| x[0].new(x[1], self) }
    end

    def call(env)
      env = env
      req = ActionDispatch::Request.new(env)
      begin
        session_id = schemes.detect { |s| s.get_session_id(env) }
        # session_id ||= SecureRandom.hexdigest
        if session_id.present?
          req.env[RACK_SESSION_ID] = session_id
          session_class.set(req, session_class.new(@store, req))
        end
      rescue UnauthorizedError
        return [ 401, {}, [ { session: :fail }.to_json ] ]
      end
      status, headers, response = @app.call(env)
      @schemes.each { |s| s.handle_response(env, status, headers, response) }
      [ status, headers, response ]
    end

    def session_class
      Rack::Session::Abstract::SessionHash
    end
  end

  class UnauthorizedError < StandardError; end

  module Stores
    class Base
      attr_reader :options, :app
      def initialize(options, app)
        @options = options
        @app = app
      end

      def load(env)
        raise NotImplementedError
      end

      def save(env)
        raise NotImplementedError
      end
    end

    class Redis < Base
      attr_reader :redis

      def initialize(options, app)
        super
        config = options.slice(*%i[host port db url path username password])
        @redis = ::Redis.new(config)
      end

      def session_key = "#{options[:prefix]}#{session_id}"

      def load
        sid = session_key
        raise UnauthorizedError unless redis.exists?(sid)
        JSON.parse(redis.get(sid))
      end

      def save
      end
    end
  end

  module Schemes
    class Base
      attr_reader :options, :app, :session_id
      delegate :env, :req, to: :app

      def initialize(options, app)
        @options = options
        @app = app
      end

      def get_session_id(env)
        raise NotImplementedError
      end

      def handle_response(env, status, headers, response)
        raise NotImplementedError
      end
    end

    class Cookie < Base
      def get_session_id(env)
        req = ActionDispatch::Request.new(env)
        request_cookie = req.cookies[options[:name]]
        return unless request_cookie.present?
        sid, signature, *tail = request_cookie.split("--")
        return if tail.count > 0
        raise UnauthorizedError unless ActiveSupport::SecurityUtils.secure_compare(generate_signature(sid), signature)
        sid
      end

      def handle_response(env, status, headers, response)
        binding.pry
      end

      def generate_signature(session_id)
        Digest::SHA512.hexdigest("#{session_id}--#{options[:signing_key]}")
      end
    end
  end
end


# require "redis"

# # Redis session storage for Rails, and for Rails only. Derived from
# # the MemCacheStore code, simply dropping in Redis instead.
# class AuthrSessionStore < ActionDispatch::Session::AbstractStore
#   VERSION = "0.11.6".freeze
#   # Rails 3.1 and beyond defines the constant elsewhere
#   unless defined?(ENV_SESSION_OPTIONS_KEY)
#     ENV_SESSION_OPTIONS_KEY = if Rack.release.split(".").first.to_i > 1
#                                 Rack::RACK_SESSION_OPTIONS
#     else
#                                 Rack::Session::Abstract::ENV_SESSION_OPTIONS_KEY
#     end
#   end

#   USE_INDIFFERENT_ACCESS = defined?(ActiveSupport).freeze
#   # ==== Options
#   # * +:key+ - Same as with the other cookie stores, key name
#   # * +:redis+ - A hash with redis-specific options
#   #   * +:url+ - Redis url, default is redis://localhost:6379/0
#   #   * +:key_prefix+ - Prefix for keys used in Redis, e.g. +myapp:+
#   #   * +:expire_after+ - A number in seconds for session timeout
#   #   * +:client+ - Connect to Redis with given object rather than create one
#   # * +:on_redis_down:+ - Called with err, env, and SID on Errno::ECONNREFUSED
#   # * +:on_session_load_error:+ - Called with err and SID on Marshal.load fail
#   # * +:serializer:+ - Serializer to use on session data, default is :marshal.
#   #
#   # ==== Examples
#   #
#   #     Rails.application.config.session_store :redis_session_store,
#   #       key: 'your_session_key',
#   #       redis: {
#   #         expire_after: 120.minutes,
#   #         key_prefix: 'myapp:session:',
#   #         url: 'redis://localhost:6379/0'
#   #       },
#   #       on_redis_down: ->(*a) { logger.error("Redis down! #{a.inspect}") },
#   #       serializer: :hybrid # migrate from Marshal to JSON
#   #
#   def initialize(app, options = {})
#     super

#     @default_options[:namespace] = "rack:session"
#     @default_options.merge!(options[:redis] || {})
#     init_options = options[:redis]&.reject { |k, _v| %i[expire_after key_prefix].include?(k) } || {}
#     @redis = init_options[:client] || Redis.new(init_options)
#     @on_redis_down = options[:on_redis_down]
#     @serializer = determine_serializer(options[:serializer])
#     @on_session_load_error = options[:on_session_load_error]
#     verify_handlers!
#   end

#   attr_accessor :on_redis_down, :on_session_load_error

#   private

#   attr_reader :redis, :key, :default_options, :serializer

#   def set_cookie(request, response, cookie)
#     cookie_jar = if @default_options[:signed]
#       request.cookie_jar.signed
#     else
#       request.cookie_jar
#     end
#     cookie_jar[key] = cookie
#   end

#   # overrides method defined in rack to actually verify session existence
#   # Prevents needless new sessions from being created in scenario where
#   # user HAS session id, but it already expired, or is invalid for some
#   # other reason, and session was accessed only for reading.
#   def session_exists?(env)
#     value = current_session_id(env)

#     !!(
#       value && !value.empty? &&
#       key_exists_with_fallback?(value)
#     )
#   rescue Errno::ECONNREFUSED, Redis::CannotConnectError => e
#     on_redis_down.call(e, env, value) if on_redis_down

#     true
#   end

#   def key_exists_with_fallback?(value)
#     key_exists?(value)
#   end

#   def key_exists?(value)
#     if redis.respond_to?(:exists?)
#       # added in redis gem v4.2
#       redis.exists?(value)
#     else
#       # older method, will return an integer starting in redis gem v4.3
#       redis.exists(value)
#     end
#   end

#   def verify_handlers!
#     %w[on_redis_down on_session_load_error].each do |h|
#       next unless (handler = public_send(h)) && !handler.respond_to?(:call)

#       raise ArgumentError, "#{h} handler is not callable"
#     end
#   end

#   def prefixed(sid)
#     "#{default_options[:key_prefix]}#{sid}"
#   end

#   def generate_sid = SecureRandom.hex

#   def session_default_values
#     [ generate_sid, USE_INDIFFERENT_ACCESS ? {}.with_indifferent_access : {} ]
#   end

#   def get_session(env, sid)
#     sid && (session = load_session_with_fallback(sid)) ? [ sid, session ] : session_default_values
#   rescue Errno::ECONNREFUSED, Redis::CannotConnectError => e
#     on_redis_down.call(e, env, sid) if on_redis_down
#     session_default_values
#   end
#   alias find_session get_session

#   def load_session_with_fallback(sid)
#     load_session_from_redis(sid)
#   end

#   def load_session_from_redis(sid)
#     data = redis.get(prefixed(sid))
#     begin
#       data ? decode(data) : nil
#     rescue StandardError => e
#       destroy_session_from_sid(sid, drop: true)
#       on_session_load_error.call(e, sid) if on_session_load_error
#       nil
#     end
#   end

#   def decode(data)
#     session = serializer.load(data)
#     USE_INDIFFERENT_ACCESS ? session.with_indifferent_access : session
#   end

#   def set_session(env, sid, session_data, options = nil)
#     expiry = get_expiry(env, options)
#     if expiry
#       redis.setex(prefixed(sid), expiry, encode(session_data))
#     else
#       redis.set(prefixed(sid), encode(session_data))
#     end
#     sid
#   rescue Errno::ECONNREFUSED, Redis::CannotConnectError => e
#     on_redis_down.call(e, env, sid) if on_redis_down
#     false
#   end
#   alias write_session set_session

#   def get_expiry(env, options)
#     session_storage_options = options || env.fetch(ENV_SESSION_OPTIONS_KEY, {})
#     session_storage_options[:ttl] || session_storage_options[:expire_after]
#   end

#   def encode(session_data)
#     serializer.dump(session_data)
#   end

#   def destroy_session(env, sid, options)
#     destroy_session_from_sid(sid, (options || {}).to_hash.merge(env: env, drop: true))
#     destroy_session_from_sid(sid, (options || {}).to_hash.merge(env: env))
#   end
#   alias delete_session destroy_session

#   def destroy(env)
#     if env["rack.request.cookie_hash"] &&
#        (sid = env["rack.request.cookie_hash"][key])
#       destroy_session_from_sid(sid, drop: true, env: env)
#     end
#     false
#   end

#   def destroy_session_from_sid(sid, options = {})
#     redis.del(prefixed(sid))
#     (options || {})[:drop] ? nil : generate_sid
#   rescue Errno::ECONNREFUSED, Redis::CannotConnectError => e
#     on_redis_down.call(e, options[:env] || {}, sid) if on_redis_down
#   end

#   def determine_serializer(serializer)
#     serializer ||= :marshal
#     case serializer
#     when :marshal then Marshal
#     when :json    then JsonSerializer
#     when :hybrid  then HybridSerializer
#     else serializer
#     end
#   end

#   # Uses built-in JSON library to encode/decode session
#   class JsonSerializer
#     def self.load(value)
#       JSON.parse(value, quirks_mode: true)
#     end

#     def self.dump(value)
#       JSON.generate(value, quirks_mode: true)
#     end
#   end

#   # Transparently migrates existing session values from Marshal to JSON
#   class HybridSerializer < JsonSerializer
#     MARSHAL_SIGNATURE = "\x04\x08".freeze

#     def self.load(value)
#       if needs_migration?(value)
#         Marshal.load(value)
#       else
#         super
#       end
#     end

#     def self.needs_migration?(value)
#       value.start_with?(MARSHAL_SIGNATURE)
#     end
#   end
# end
