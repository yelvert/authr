module Authr
  module Plugin
    @registered = []
    @enabled = {}

    class << self
      attr_reader :registered, :enabled

      def load
        return if @_loaded
        CONFIG[:plugins].keys.each(&method(:enable))
        @_loaded = true
      end

      def register(klass)
        raise "Plugins must descend from Authr::Plugin::Base" unless klass < Authr::Plugin::Base
        raise "Plugin named `#{klass.plugin_name}` already registered" if find_registered(klass.plugin_name)
        @registered << klass
      end

      def find_registered(name)
        name.to_sym
        @registered.find { |p| p.plugin_name == name }
      end

      def enable(name)
        name = name.to_sym
        raise "Tried to enable unknown plugin `#{name}`" unless klass = find_registered(name)
        raise "Already enabled plugin `#{name}`" if @enabled.key?(name)
        @enabled[name] = klass.new config_for(name)
      end

      def config_for(name) = Authr::CONFIG[:plugins][name.to_sym]
    end
  end
end

Rails.root.glob("lib/authr/plugin/**/*.rb").sort_by(&:to_s).each { |f| require f }
Rails.root.glob("plugins/**/*.rb").sort_by(&:to_s).each { |f| require f }
