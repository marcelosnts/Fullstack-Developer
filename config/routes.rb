Rails.application.routes.draw do
    root 'app#index' 

    scope :api, defaults: { format: :json } do
        devise_for :users
        resources :users, only: [:index, :update]
        resources :info, only: :index
    end
    
    match '*path', to: 'app#index', via: [:get]
end
