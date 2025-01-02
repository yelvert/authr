# # Rails.application.config.session_store :active_record_store, key: "_authr_session"

# session_url = "#{ENV.fetch('REDIS_CACHE_URL', 'redis://127.0.0.1:6379')}/0/session"
# secure = Rails.env.production?
# key = Rails.env.production? ? "_authr_session" : "_authr_session_#{Rails.env}"
# domain = ENV.fetch("DOMAIN_NAME", "new.home.yelvert.io")

# Rails.application.config.session_store :redis_store,
#                                        url: session_url,
#                                        expire_after: 1.hour,
#                                        key: key,
#                                        domain: domain,
#                                        threadsafe: true,
#                                        secure: secure,
#                                        same_site: :lax,
#                                        httponly: true
