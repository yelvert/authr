module Authr
  module Config
    require "optparse"
    require "active_support/core_ext/array/grouping"
    require "active_support/core_ext/hash/indifferent_access"

    class Cli
      AUTHR_PLUGIN_OPTION_MATCHER = /\A--plugin\.(?<name>[^\.=]+)(?:\.(?<options>[^=]*))(?:=(?<value>.*))\z/m
      real_argv, *authr_argv = ARGV.split("--")
      REAL_ARGV = real_argv || []
      AUTHR_ARGV = authr_argv.flatten
      CONFIG = {}.with_indifferent_access

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
              acc[h] ||= {}.with_indifferent_access # initialize the missing keys (ex: b in this case)
            end
            acc.public_send(:[], h)
          end.public_send(:[]=, keys.last, value)
        end

        def parse_options
          op = OptionParser.new do |opts|
            opts.banner = "Usage: bin/rails [rails command options] -- [authr options]"
            opts.on("--master-key=VALUE", "Key used to sign cookies") { |v| CONFIG[:master_key] = v }
            opts.on("--admin-username=VALUE", "Site Name") { |v| CONFIG[:admin_username] = v }
            opts.on("--site-name=VALUE", "Site Name") { |v| CONFIG[:site_name] = v }
            opts.on("--host=VALUE", "The host this site will be served on, used for redirects, ex: http://example.com:1234") { |v| CONFIG[:host] = v }
            opts.on("--allowed-domains=VALUE", "Comma separated list of domains that may be used to access this site, useful when behind certain reverse proxy configurations") { |v| CONFIG[:allowed_domains] = v.split(/,\s?/) }
            opts.on("--cookie-ssl=VALUE", "Set cookie as secure or not") { |v| CONFIG[:cookie_ssl] = v }
            opts.on("--cookie-domain=VALUE", "Domain for the cookie") { |v| CONFIG[:cookie_domain] = v }
            opts.on("--cookie-name=VALUE", "Name of the cookie") { |v| CONFIG[:cookie_name] = v }
            opts.on("--cookie-same-site=VALUE", "Cookie SameSite, one of (Strict, Lax, None), should be Lax unless you know what you're doing") { |v| CONFIG[:cookie_same_site] = v }
            opts.on("--session-expiration=VALUE", "Time in seconds for the the cookie expiration") { |v| CONFIG[:session_expiration] = v }
            opts.on("--help", "Show this message") do
              puts op
              exit
            end
          end
          begin
            op.parse!(AUTHR_ARGV)
          rescue OptionParser::InvalidOption => e
            opt = e.args.first
            raise e unless opt.start_with?("--plugin.")
            data = AUTHR_PLUGIN_OPTION_MATCHER.match opt
            if !data || data[:name].empty? || data[:options].empty? || data[:value].empty?
              puts "Plugin options must be in the format `--plugin.<name>.<option>[.<suboptions...>]=<value>`, ex: `--plugin.foo.bar=baz`"
              exit 1
            end
            name = data[:name].to_sym
            option = data[:options]
            value = data[:value]
            CONFIG[:plugins] ||= {}.with_indifferent_access
            CONFIG[:plugins][name] ||= {}.with_indifferent_access
            options = option.split(".").map { |x| x =~ /^\d+$/ ? x.to_i : x.to_sym }
            deep_set(CONFIG[:plugins][name], value, *options)
            parse_options
          end
        end
    end
  end
end
Authr::Config::Cli.parse!
