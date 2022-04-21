Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/articles/index'
      get '/users/index'
      get '/charts/index'
      get '/rideshares/index'
      get '/location_points/index'
      get '/documents/index/:document_folder', to: 'documents#index'
      get '/entry/initial_payload', to: 'entry#initial_payload'

      post '/articles/create'
      post '/users/create'
      post '/charts/create'
      post '/documents/create'
      post '/rideshares/create'
      post '/location_points/create'
      
      get '/articles/:id', to: 'articles#show'
      get '/users/:id', to: 'users#show'
      get '/pictures/:id', to: 'pictures#show'
      get '/charts/:id', to: 'chart#show'
      get '/location_points/get_single/:id', to: 'location_points#single'

      delete '/rideshares/destroy/:id', to: 'rideshares#destroy'
      delete '/documents/destroy/:id', to: 'documents#destroy'
      delete '/articles/destroy/:id', to: 'articles#destroy'
      delete '/charts/destroy/:id', to: 'charts#destroy'
      delete '/location_points/destroy/:id', to: 'location_points#destroy'
      
      resources :users, only: [:create, :show, :index]
      resources :articles, only: [:create, :show, :index, :destroy]
      resources :charts, only: [:create, :show, :index, :destroy]
      resources :rideshares
      resources :location_points
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

  get '/articles', to: 'articles#index'
  get '/blog', to: 'articles#index'
  get '/users', to: 'users#index'
  get '/search', to: 'pages#search', as: 'search'

  match '*path' => 'pages#home', via: :all

end
