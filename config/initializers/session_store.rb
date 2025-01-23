Rails.application.config.session_store(
  :cookie_store,
  domain: Authr::CONFIG[:cookie_domain],
  key: Authr::CONFIG[:cookie_name],
  same_site: Authr::CONFIG[:cookie_same_site],
  secure: Authr::CONFIG[:cookie_ssl],
  expire_after: Authr::CONFIG[:session_expiration],
)
