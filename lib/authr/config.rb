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

    class << self
      def load
        return @instance if @instance
        @instance = {}.with_indifferent_access
        @instance.merge!(
          DEFAULT_CONFIG,
          FILE_CONFIG,
          Config::Cli::CONFIG,
        )
        %i[ cookie_ssl sync_docker_enabled ].each { |k| @instance[k] = @instance[k].downcase == "true" if @instance[k].is_a? String }
        master_key_file = ENV.fetch("AUTHR_MASTER_KEY_FILE") { ENV["AUTHR_MASTER_KEY_FILE"] }
        @instance[:master_key] = File.read(master_key_file).strip if @instance[:master_key].nil? && master_key_file.present? && File.exist?(master_key_file)
        raise "must have a master_key configured" unless @instance[:master_key].present?
        admin_password_file = ENV.fetch("AUTHR_ADMIN_PASSWORD_FILE") { ENV["AUTHR_ADMIN_PASSWORD_FILE"] }
        @instance[:admin_password] = File.read(admin_password_file).strip if @instance[:admin_password].nil? && admin_password_file.present? && File.exist?(admin_password_file)
        @instance[:allowed_domains] = @instance[:allowed_domains].split(/,\s?/) if @instance[:allowed_domains].is_a?(String)
        @instance[:plugins] = (@instance[:plugins] || {}).with_indifferent_access
        @instance
      end
    end
  end

  CONFIG = Config.load
end
