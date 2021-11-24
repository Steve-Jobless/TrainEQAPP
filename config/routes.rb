Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :expressions, only: [ :index, :show, :create ]
      resources :meetings, only: [ :create, :update, :show ]
    end
  end

  resources :participants, only: :show do
    resources :expressions, only: :create
  end

  resources :meetings, only: :show do
    resources :participants, only: :show do
        resources :expressions, only: :create
    end
  end
  
  get "/dashboard", to: "users#dashboard", as: :dashboard
end
