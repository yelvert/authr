module Authr
  module Plugin
    class Docker < Base
      plugin_name :docker

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
