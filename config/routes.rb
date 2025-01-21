Rails.application.routes.draw do
  defaults export: true do
    get :forward_auth, to: "forward_auth#index", as: :forward_auth
    get :forward_auth_login, to: "forward_auth#login", as: :forward_auth_login

    resource :session, only: %i[ new create destroy ] do
      get :logout, action: :destroy
    end
  end

  resources :users
  get :home, to: "home#index"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root to: redirect("/home", status: 302)
end
