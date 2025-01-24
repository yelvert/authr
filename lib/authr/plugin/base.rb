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
      end

      attr_reader :configuration

      def initialize(configuration)
        @configuration = configuration
      end
    end
  end
end
