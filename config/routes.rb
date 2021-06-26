Rails.application.routes.draw do
  root 'app#index' 
  match '*path', to: 'app#index', via: [:get]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
