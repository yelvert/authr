require_relative "./config/cli"

module Authr
  module Config
    DEFAULT_CONFIG = {
      site_name: "Authr",
      host: "http://localhost:3000",
      allowed_domains: [],
      cookie_ssl: false,
      cookie_name: "_authr_session",
      cookie_domain: "localhost",
      cookie_same_site: "Lax",
      session_expiration: 1.hour,
      admin_username: "admin",
      sync_docker_enabled: false,
      sync_docker_interval: "every 30 seconds",
      plugins: {}
    }.with_indifferent_access

    CONFIG_PATH = ENV.fetch("AUTHR_CONFIG_PATH") { File.join(Rails.root, "config", "authr.yml") }
    FILE_CONFIG = (File.exist?(CONFIG_PATH) ? ActiveSupport::ConfigurationFile.parse(CONFIG_PATH) : {}).with_indifferent_access

    ENV_CONFIG = {
      master_key: ENV["AUTHR_MASTER_KEY"],
      site_name: ENV["AUTHR_SITE_NAME"],
      host: ENV["AUTHR_HOST"],
      allowed_domains: ENV["AUTHR_ALLOWED_DOMAINS"],
      cookie_ssl: ENV["AUTHR_COOKIE_SSL"],
      cookie_name: ENV["AUTHR_COOKIE_NAME"],
      cookie_same_site: ENV["AUTHR_COOKIE_SAME_SITE"],
      session_expiration: ENV["AUTHR_SESSION_EXPIRATION"],
      admin_username: ENV["AUTHR_ADMIN_USERNAME"],
      admin_password: ENV["AUTHR_ADMIN_PASSWORD"],
      docker_url: ENV["AUTHR_DOCKER_URL"],
      sync_docker_enabled: ENV["AUTHR_SYNC_DOCKER_ENABLED"],
      sync_docker_interval: ENV["AUTHR_SYNC_DOCKER_INTERVAL"]
    }.compact.with_indifferent_access

    class << self
      def load
        return @_config if @_config
        @_config = {}.with_indifferent_access
        @_config.merge!(
          DEFAULT_CONFIG,
          FILE_CONFIG,
          ENV_CONFIG,
          Config::Cli::CONFIG,
        )
        %i[ cookie_ssl sync_docker_enabled ].each { |k| @_config[k] = @_config[k].downcase == "true" if @_config[k].is_a? String }
        master_key_file = ENV.fetch("AUTHR_MASTER_KEY_FILE") { ENV["AUTHR_MASTER_KEY_FILE"] }
        @_config[:master_key] = File.read(master_key_file).strip if @_config[:master_key].nil? && master_key_file.present? && File.exist?(master_key_file)
        raise "must have a master_key configured" unless @_config[:master_key].present?
        admin_password_file = ENV.fetch("AUTHR_ADMIN_PASSWORD_FILE") { ENV["AUTHR_ADMIN_PASSWORD_FILE"] }
        @_config[:admin_password] = File.read(admin_password_file).strip if @_config[:admin_password].nil? && admin_password_file.present? && File.exist?(admin_password_file)
        @_config[:allowed_domains] = @_config[:allowed_domains].split(/,\s?/) if @_config[:allowed_domains].is_a?(String)
        @_config[:plugins] = (@_config[:plugins] || {}).with_indifferent_access
        @_config
      end
    end
  end

  CONFIG = Config.load
end
