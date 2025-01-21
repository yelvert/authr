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
  CONFIG = ActiveSupport::OrderedOptions.new.update(
    ActiveSupport::ConfigurationFile.parse(CONFIG_PATH).deep_symbolize_keys.reverse_merge({
      site_name: "Yelvert Home",
      ssl: false,
      cookie_name: "_authr_session",
      cookie_same_site: "Lax",
      session_expiration: 1.hour,
      admin_username: "admin",
      sync_docker_enabled: false,
      sync_docker_interval: "every 30 seconds"
    })
  )

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

    config.action_controller.default_url_options = {
      protocol: "http#{Authr::CONFIG[:ssl] && "s"}",
      host: Authr::CONFIG[:domain],
      port: Authr::CONFIG[:port]
    }

    Docker.url = Authr::CONFIG[:docker_url]

    # config.action_controller.asset_host = "localhost:3036"
    config.hosts << Authr::CONFIG[:domain]
    config.hosts << (/\A#{ActionDispatch::HostAuthorization::SUBDOMAIN_REGEX}+#{Regexp.escape(Authr::CONFIG[:cookie_domain])}#{ActionDispatch::HostAuthorization::PORT_REGEX}?\z/i)
  end
end
