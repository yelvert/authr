class Application < ApplicationRecord
  has_many :application_groups, dependent: :destroy
  has_many :groups, through: :application_groups

  has_many :application_groups_custom, -> { where(generated: false) }, dependent: :destroy, class_name: :ApplicationGroup
  has_many :groups_custom, through: :application_groups_custom, source: :group, inverse_of: :application_groups

  has_many :application_groups_generated, -> { where(generated: true) }, dependent: :destroy, class_name: :ApplicationGroup
  has_many :groups_generated, through: :application_groups_generated, source: :group, inverse_of: :application_groups


  has_many :application_users, dependent: :destroy
  has_many :users, through: :application_users

  has_many :application_users_custom, -> { where(generated: false) }, dependent: :destroy, class_name: :ApplicationUser
  has_many :users_custom, through: :application_users_custom, source: :user, inverse_of: :application_users

  has_many :application_users_generated, -> { where(generated: true) }, dependent: :destroy, class_name: :ApplicationUser
  has_many :users_generated, through: :application_users_generated, source: :user, inverse_of: :application_users


  attribute :hostnames, :json_array, default: -> { [] }

  validates :source, inclusion: { in: %w[ custom docker ], message: 'Must be one of "custom" or "docker"' }

  scope :for_hostname, ->(hostname) { where("? IN (SELECT value FROM json_each(applications.hostnames))", hostname) }
end
