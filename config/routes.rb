Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :articles do
    resources :comments
  end
  resources :users
  resources :sessions
  
  root 'pages#home'
  
  get '/articles', to: 'articles#index'
  get '/users', to: 'users#index'

end
