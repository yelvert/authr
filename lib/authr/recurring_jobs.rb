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
          {}.merge(Authr::Plugin.recurring_jobs)
        end
    end
  end
end
