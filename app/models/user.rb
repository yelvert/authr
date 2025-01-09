class User < ApplicationRecord
  has_many :user_groups, autosave: true
  has_many :groups, through: :user_groups, dependent: :destroy

  validates :username, presence: true, uniqueness: true

  attr_accessor :password
  validates_presence_of :password, if: -> { new_record? && password_digest.blank? }
  validates :password, confirmation: true, allow_blank: true

  class << self
    def authenticate(username, password)
      user = User.where(username: username).first
      return unless user
      return unless user.authenticate(password)
      user
    end
  end

  def password=(unencrypted_password)
    if unencrypted_password.nil?
      @password = nil
      self.password_digest = nil
    elsif !unencrypted_password.empty?
      @password = unencrypted_password
      self.password_digest = Argon2id::Password.create(unencrypted_password)
    end
  end

  def authenticate(unencrypted_password)
    password_digest? && Argon2id::Password.new(password_digest).is_password?(unencrypted_password) && self
  end

  def password_salt
    Argon2id::Password.new(password_digest).salt if password_digest?
  end
end
