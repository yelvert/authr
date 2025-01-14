Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"

  scope controller: :current_user, path: "/current_user", as: :current_user do
    get "/", action: :whoami, as: :whoami
  end

  scope controller: :forward_auth, path: "/forward_auth", as: :forward_auth do
    get "/", action: :index
    get :login
  end

  resource :session, only: %i[ new create ] do
    get :logout, action: :destroy
  end

  get "/admin/app(/*path)", to: "admin#index", as: :admin
  namespace :admin, only: %i[ index show create update destroy ] do
    resources :users do
      member do
        put "/groups/:group_id", action: :add_group, as: :add_group
        delete "/groups/:group_id", action: :remove_group, as: :remove_group
      end
    end
    resources :groups, only: %i[ index show create update destroy ] do
      member do
        put "/users/:user_id", action: :add_user, as: :add_user
        delete "/users/:user_id", action: :remove_user, as: :remove_user
      end
    end
    resources :applications, only: %i[ index show create update destroy ]
  end

  get "up" => "rails/health#show", as: :rails_health_check
  root to: redirect("/admin/app", status: 302)
end
