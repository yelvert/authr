Rails.configuration.after_initialize do
  if ActiveRecord::Base.connection.table_exists? User.table_name
    admin_user = User.where(admin: true).first_or_initialize
    admin_user.name = "Administrator"
    admin_user.username = Authr::CONFIG[:admin_username]
    admin_user.admin = true
    if Authr::CONFIG[:admin_password]
      admin_user.password_digest = Authr::CONFIG[:admin_password]
      admin_user.save!
      Rails.logger.info "Administrator user #{admin_user.username} created"
    else
      admin_user.password = admin_user.password_confirmation = SecureRandom.hex
      admin_user.save!
      Rails.logger.info "Administrator user #{admin_user.username} created with password \"#{admin_user.password}\""
    end
  end
end
