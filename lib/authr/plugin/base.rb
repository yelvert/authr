module Authr
  module Plugin
    class Base
      class << self
        attr_reader :plugin_name
        def plugin_name(name = :__getter__)
          return @plugin_name if name == :__getter__
          @plugin_name = name.to_sym
        end

        def inherited(klass)
          klass.send(:extend, Finalize)
          klass.define_singleton_method(:__finalize__) { Authr::Plugin.register(klass) }
          klass.singleton_class.send(:private, :__finalize__)
        end

        def default_config(&block)
          @default_config = yield if block_given?
          @default_config ||= {}.with_indifferent_access
        end

        def recurring_jobs = @recurring_jobs ||= {}
        def recurring_job(name, &block)
          @recurring_jobs ||= {}
          @recurring_jobs[:"#{name}"] = block
        end
      end

      delegate :plugin_name, to: :class
      attr_reader :config, :recurring_jobs

      def initialize(config)
        @config = self.class.default_config.deep_dup.merge(config)
        @recurring_jobs = self.class.recurring_jobs.map do |name, block|
          job_hash = instance_eval(&block)
          job_hash.present? ? { "#{name}": job_hash } : {}
        end.reduce(&:merge).freeze
      end
    end
  end
end
