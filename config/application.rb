require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
# require "action_mailbox/engine"
# require "action_text/engine"
require "action_view/railtie"
# require "action_cable/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Authr
  CONFIG_PATH = ENV.fetch("AUTHR_CONFIG_PATH") { File.join(__dir__, "authr.yml") }
  CONFIG = ActiveSupport::OrderedOptions.new.update({
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
    sync_docker_interval: "every 30 seconds"
  }.merge(
    File.exist?(CONFIG_PATH) ? ActiveSupport::ConfigurationFile.parse(CONFIG_PATH).deep_symbolize_keys : {},
    {
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
    }.compact,
    CliConfig::AUTHR_CONFIG,
  ))
  %i[ cookie_ssl sync_docker_enabled ].each { |k| CONFIG[k] = CONFIG[k].downcase == "true" if CONFIG[k].is_a? String }
  master_key_file = ENV.fetch("AUTHR_MASTER_KEY_FILE") { ENV["AUTHR_MASTER_KEY_FILE"] }
  CONFIG[:master_key] = File.read(master_key_file).strip if CONFIG[:master_key].nil? && master_key_file.present? && File.exist?(master_key_file)
  admin_password_file = ENV.fetch("AUTHR_ADMIN_PASSWORD_FILE") { ENV["AUTHR_ADMIN_PASSWORD_FILE"] }
  CONFIG[:admin_password] = File.read(admin_password_file).strip if CONFIG[:admin_password].nil? && admin_password_file.present? && File.exist?(admin_password_file)
  CONFIG[:allowed_domains] = CONFIG[:allowed_domains].split(/,\s?/) if CONFIG[:allowed_domains].is_a?(String)

  raise "must have a master_key configured" unless CONFIG[:master_key].present?

  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Don't generate system test files.
    config.generators.system_tests = nil

    config.secret_key_base = Authr::CONFIG[:master_key]

    default_host = URI.parse(Authr::CONFIG[:host])
    config.action_controller.default_url_options = {
      protocol: default_host.scheme,
      host: default_host.host,
      port: default_host.port
    }

    Docker.url = Authr::CONFIG[:docker_url]

    # config.action_controller.asset_host = "localhost:3036"
    config.hosts << "#{default_host.host}:#{default_host.port}"
    (Authr::CONFIG[:allowed_domains] || []).each { |x| config.hosts << x }
    config.hosts << (/\A#{ActionDispatch::HostAuthorization::SUBDOMAIN_REGEX}+#{Regexp.escape(Authr::CONFIG[:cookie_domain])}#{ActionDispatch::HostAuthorization::PORT_REGEX}?\z/i)
  end
end
