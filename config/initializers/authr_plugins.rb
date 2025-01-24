Rails.application.config.to_prepare do
  Authr::Plugin.load
end
