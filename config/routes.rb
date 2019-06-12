Rails.application.routes.draw do

  resources :articles
  resources :comments, only: [:new, :create, :destroy]
  resources :users do
    member do
      get :confirm_email
    end
  end
  resources :sessions, only: [:new, :create, :destroy]
  resources :events
  
  root 'pages#home'
  
  get '/articles', to: 'articles#index'
  get '/users', to: 'users#index'
  get '/signup', to: 'users#new', as: 'signup'
  get '/login', to: 'sessions#new', as: 'login'
  get '/forms', to: 'pages#forms', as: 'forms'
  get '/bylaws', to: 'pages#bylaws', as: 'bylaws'
  get '/chartiable_gift', to: 'pages#charitable_gift', as: 'charitable_gift'
  get '/customs', to: 'pages#customs', as: 'customs'
  get '/history', to: 'pages#history', as: 'history'
  get '/membership', to: 'pages#membership', as: 'membership'
  get '/planned_giving', to: 'pages#planned_giving', as: 'planned_giving'
  get '/familyagreements', to: 'pages#familyagreements', as: 'familyagreements'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy', as: 'logout'

end
