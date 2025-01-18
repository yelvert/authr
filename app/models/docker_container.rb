class DockerContainer
  include ActiveModel::Attributes

  attribute :name, :string
  attribute :hostnames, :json_array, default: []
  attribute :groups, :json_array, default: []
  attribute :users, :json_array, default: []
  attr_reader :container

  def initialize(attrs = {})
    super()
    attrs = attrs.symbolize_keys
    self.name = attrs[:name]
    self.hostnames = attrs[:hostnames] || []
    @container = attrs[:container]
    self.groups = attrs[:groups] || []
    self.users = attrs[:users] || []
  end

  def info = container.info

  def application
    return @application if @application.present?
    @app = Application.find_or_initialize_by(name: self.name, source: "docker")
    @app.assign_attributes(
      hostnames: self.hostnames,
      active: true,
      groups_generated_ids: self.groups.map(&:id),
      users_generated_ids: self.users.map(&:id)
    )
    @app
  end

  def application!
    application.save!
    application
  end

  class << self
    def all(filters = {}) = Docker::Container.all(
      all: true,
      filters: { label: [ "authr.host" ] }.deep_merge(filters).to_json
    ).map(&method(:from_container))

    def find_by_name(name) = all(name: name).first

    def from_container(container)
      new(
        name: container.info["Names"].first,
        hostnames: container.info["Labels"]["authr.host"].split(/,\s?/),
        container: container,
        groups: Group.where(
          "id IN (?) OR name IN (?)",
          container.info["Labels"]["authr.allowed_group_ids"].split(/,\s?/).map(&:to_i),
          container.info["Labels"]["authr.allowed_groups"].split(/,\s?/),
        ).to_a,
        users: User.where(
          "id IN (?) OR username IN (?)",
          container.info["Labels"]["authr.allowed_user_ids"].split(/,\s?/).map(&:to_i),
          container.info["Labels"]["authr.allowed_users"].split(/,\s?/),
        ).to_a,
      )
    end
  end
end
