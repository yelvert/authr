module Authr
  module RecurringJobs
    class << self
      def to_config_yaml
        configs = self.all
        return "{}" if configs.empty?
        configs
          .deep_stringify_keys
          .to_yaml
          .delete_prefix("---")
          .strip
          .prepend("\n")
      end

      private
        def all
          {}.merge(sync_docker)
        end

        def sync_docker
          return {} unless Authr::CONFIG[:sync_docker_enabled]
          {
            sync_docker: {
              class: "SyncDockerJob",
              schedule: Authr::CONFIG[:sync_docker_interval]
            }
          }
        end
    end
  end
end
