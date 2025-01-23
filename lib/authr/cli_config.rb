module Authr
  require "optparse"
  require "active_support/core_ext/array/grouping"

  class CliConfig
    AUTHR_PLUGIN_OPTION_MATCHER = /\A--plugin\.(?<name>[^\.=]+)(?:\.(?<options>[^=]*))(?:=(?<value>.*))\z/m
    real_argv, *authr_argv = ARGV.split("--")
    REAL_ARGV = real_argv || []
    AUTHR_ARGV = authr_argv.flatten
    AUTHR_CONFIG = {}

    private :initialize

    class << self
      def parse!
        Object.send(:remove_const, "ARGV")
        Object.send(:const_set, "ARGV", REAL_ARGV)
        new.send(:parse_options)
      end
    end

    private

      def deep_set(hash, value, *keys)
        keys[0...-1].each_with_index.inject(hash) do |acc, pair|
          h, i = pair
          if keys[i+1].is_a? Integer
            acc[h] ||= []
          else
            acc[h] ||= {} # initialize the missing keys (ex: b in this case)
          end
          acc.public_send(:[], h)
        end.public_send(:[]=, keys.last, value)
      end

      def parse_options
        OptionParser.new do |opts|
          opts.banner = "Usage: bin/rails [rails command options] -- [authr options]"
          opts.on("--master-key=VALUE", "Key used to sign cookies") { |v| AUTHR_CONFIG[:master_key] = v }
          opts.on("--admin-username=VALUE", "Site Name") { |v| AUTHR_CONFIG[:admin_username] = v }
          opts.on("--site-name=VALUE", "Site Name") { |v| AUTHR_CONFIG[:site_name] = v }
          opts.on("--host=VALUE", "The host this site will be served on, used for redirects, ex: http://example.com:1234") { |v| AUTHR_CONFIG[:host] = v }
          opts.on("--allowed-domains=VALUE", "Comma separated list of domains that may be used to access this site, useful when behind certain reverse proxy configurations") { |v| AUTHR_CONFIG[:allowed_domains] = v.split(/,\s?/) }
          opts.on("--cookie-ssl=VALUE", "Set cookie as secure or not") { |v| AUTHR_CONFIG[:cookie_ssl] = v }
          opts.on("--cookie-domain=VALUE", "Domain for the cookie") { |v| AUTHR_CONFIG[:cookie_domain] = v }
          opts.on("--cookie-name=VALUE", "Name of the cookie") { |v| AUTHR_CONFIG[:cookie_name] = v }
          opts.on("--cookie-same-site=VALUE", "Cookie SameSite, one of (Strict, Lax, None), should be Lax unless you know what you're doing") { |v| AUTHR_CONFIG[:cookie_same_site] = v }
          opts.on("--session-expiration=VALUE", "Time in seconds for the the cookie expiration") { |v| AUTHR_CONFIG[:session_expiration] = v }
          opts.on("--docker-url=VALUE", "The url to connect to docker") { |v| AUTHR_CONFIG[:docker_url] = v }
          opts.on("--sync-docker=VALUE", "Set sync with docker") { |v| AUTHR_CONFIG[:sync_docker_enabled] = v }
          opts.on("--sync-docker-interval=VALUE", "How often to sync with docker (value is parsed by fugit (https://github.com/floraison/fugit)") { |v| AUTHR_CONFIG[:sync_docker_interval] = v }
        end.parse!(AUTHR_ARGV)
      end
  end
end

Authr::CliConfig.parse!
