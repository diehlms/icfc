Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/articles/index'
      get '/users/index'
      get '/charts/index'

      post '/articles/create'
      post '/users/create'
      post '/charts/create'
      
      get '/articles/:id', to: 'articles#show'
      get '/users/:id', to: 'users#show'
      get '/pictures/:id', to: 'pictures#show'
      get '/charts/:id', to: 'chart#show'

      delete '/articles/destroy/:id', to: 'articles#destroy'
      delete '/charts/destroy/:id', to: 'charts#destroy'
      
      resources :users, only: [:create, :show, :index]
      resources :articles, only: [:create, :show, :index, :destroy]
      resources :charts, only: [:create, :show, :index, :destroy]
    end
  end
  
  get '/login', to: 'sessions#new', as: 'login'
  delete '/logout', to: 'sessions#destroy', as: 'logout'
  post '/login', to: 'sessions#create'
  get '/signup', to: 'users#new', as: 'signup'
  resources :password_resets, only: [:new, :create, :edit, :update]
  resources :users do
    member do
      get :confirm_email
      post :toggle_verified
    end
  end
  resources :search, only: [:index]
  resources :sessions, only: [:new, :create, :destroy]
  root 'pages#home'
  
  resources :cabin_attachments
  resources :articles do
    member do
      post :toggle_pinned
    end
  end
  resources :comments
  resources :events
  resources :cabins
  resources :cabindates
  resources :galleries
  resources :rooms
  resources :room_messages
  resources :charts
  resources :rideshares

  get '/articles', to: 'articles#index'
  get '/blog', to: 'articles#index'
  get '/users', to: 'users#index'
  get '/search', to: 'pages#search', as: 'search'
  # get '/forms', to: 'pages#forms', as: 'forms'
  # get '/bylaws', to: 'pages#bylaws', as: 'bylaws'
  # get '/chartiable_gift', to: 'pages#charitable_gift', as: 'charitable_gift'
  # get '/customs', to: 'pages#customs', as: 'customs'
  # get '/history', to: 'pages#history', as: 'history'
  # get '/membership', to: 'pages#membership', as: 'membership'
  # get '/planned_giving', to: 'pages#planned_giving', as: 'planned_giving'
  # get '/familyagreements', to: 'pages#familyagreements', as: 'familyagreements'
  # get '/archives', to: 'pages#archives', as: 'archives'
  # get '/committee_primer', to: 'pages#committee_primer', as: 'committee_primer'

  match '*path' => 'pages#home', via: :all

end
