class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups, dependent: :destroy

  has_many :application_groups, dependent: :destroy
  has_many :applications, through: :application_groups
end
