Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :expressions, only: [ :index, :show, :create ]
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
end
