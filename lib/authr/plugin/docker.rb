module Authr
  module Plugin
    class Docker < Base
      plugin_name :docker

      default_config do
        {
          address: "unix:///var/run/docker.sock",
          sync_interval: "every 30 seconds"
        }
      end

      recurring_job :sync do |plugin|
        {
          class: "Authr::Plugin::Docker::SyncDockerJob",
          schedule: config[:sync_interval]
        }
      end
    end
  end
end

require_relative "./docker/container"
require_relative "./docker/sync_job"
