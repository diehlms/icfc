Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :articles
  resources :comments, only: [:new, :create, :destroy]
  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  
  root 'pages#home'
  
  get '/articles', to: 'articles#index'
  get '/users', to: 'users#index'
  get '/signup', to: 'users#new', as: 'signup'
  get '/login', to: 'sessions#new', as: 'login'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy', as: 'logout'

end
