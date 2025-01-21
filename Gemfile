source "https://rubygems.org"

gem "rails", "~> 8.0.1"
gem "propshaft"
gem "sqlite3", ">= 2.1"
gem "puma", ">= 5.0"
gem "jbuilder"

gem "tzinfo-data", platforms: %i[ windows jruby ]

gem "solid_cache"
gem "solid_queue"

gem "bootsnap", require: false

# Deploy this application anywhere as a Docker container [https://kamal-deploy.org]
gem "kamal", require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem "thruster", require: false

group :development, :test do
  gem "brakeman", require: false

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem "rubocop-rails-omakase", require: false

  gem "pry"
  gem "pry-doc"
  gem "pry-nav"
  gem "pry-remote"
  gem "pry-rails"

  gem "rspec-rails"
  gem "rswag-specs"
  gem "factory_bot"
  gem "factory_bot_rails"
  gem "faker"
end

group :development do
  gem "web-console"
end


gem "docker-api", "~> 2.4"

gem "argon2id", "~> 0.8.0"

gem "vite_rails", "~> 3.0"

gem "rswag", "~> 2.16"

gem "rswag-api"
gem "rswag-ui"
