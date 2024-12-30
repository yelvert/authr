class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true

  attr_accessor :password
  validates_presence_of :password, if: :new_record?
  validates :password, confirmation: true, allow_blank: true

  attr_accessor :old_password
  validates_presence_of :old_password, if: :persisted?
  validate { errors.add :old_password, "incorrect" if persisted? && !authenticate(old_password) }

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
