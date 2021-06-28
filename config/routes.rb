Rails.application.routes.draw do
    root 'app#index' 
    match '*path', to: 'app#index', via: [:get]

    scope :api, defaults: { format: :json } do
        devise_for :users
        resources :users, only: [:update]
    end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
