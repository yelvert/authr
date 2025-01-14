class Application < ApplicationRecord
  attribute :hostnames, :json_array, default: -> { [] }
  attribute :source, :string, default: :database
  attribute :docker_definition, :hash
  validate do
    errors.add(:source, "Cannot save an Application with a source other than database") unless source == "database"
  end

  class << self
    def from_docker
      Docker::Container.all(all: true, filters: { label: [ "authr.host" ] }.to_json).map do |container|
        new(
          name: container.info["Names"].first,
          hostnames: container.info["Labels"]["authr.host"].split(/,\s?/),
          source: :docker,
          docker_definition: container.info,
        )
      end
    end

    def find_docker(name)
      container = Docker::Container.all(all: true, filters: { name: [ name ] }.to_json).first
      new(
        name: container.info["Names"].first,
        hostnames: container.info["Labels"]["authr.host"].split(/,\s?/),
        source: :docker,
        docker_definition: container.info,
      )
    end
  end
end
