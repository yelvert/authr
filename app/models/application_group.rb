class ApplicationGroup < ApplicationRecord
  belongs_to :application
  belongs_to :group
end
