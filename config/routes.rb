Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/articles/index'
      get '/users/index'
      get '/events/index'
      get '/cabins/index'
      get '/search/index'
      get '/pictures/index'
      get '/comments/index'
      get '/cabin_image/index'
      get '/cabin_date/index'

      post '/articles/create'
      post '/users/create'
      post '/events/create'
      post '/cabins/create'
      post '/pictures/create'
      post '/cabin_image/create'
      post '/comments/create'
      post '/cabin_date/create'
      
      get '/articles/:id', to: 'articles#show'
      get '/users/:id', to: 'users#show'
      get '/events/:id', to: 'events#show'
      get '/cabins/:id', to: 'cabins#show'
      get '/pictures/:id', to: 'pictures#show'

      delete '/articles/destroy/:id', to: 'articles#destroy'
      delete '/cabins/destroy/:id', to: 'cabins#destroy'
      delete '/events/destroy/:id', to: 'events#destroy'
      delete '/pictures/destroy/:id', to: 'pictures#destroy'
      delete '/comments/destroy/:id', to: 'comments#destroy'
      delete '/cabin_image/destroy/:id', to: 'cabin_image#destroy'
      delete '/cabin_date/destroy/:id', to: 'cabin_date#destroy'

      post '/login', to: 'auth#create'
      delete '/logout', to: 'auth#destroy'
      get '/logged_in', to: 'auth#is_logged_in?'
      
      resources :users, only: [:create, :show, :index]
    end
  end

  # make sure to comment this line out when not using react in dev
  # get '/*path' => 'pages#landing'
  
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
  get '/forms', to: 'pages#forms', as: 'forms'
  get '/bylaws', to: 'pages#bylaws', as: 'bylaws'
  get '/chartiable_gift', to: 'pages#charitable_gift', as: 'charitable_gift'
  get '/customs', to: 'pages#customs', as: 'customs'
  get '/history', to: 'pages#history', as: 'history'
  get '/membership', to: 'pages#membership', as: 'membership'
  get '/planned_giving', to: 'pages#planned_giving', as: 'planned_giving'
  get '/familyagreements', to: 'pages#familyagreements', as: 'familyagreements'
  get '/archives', to: 'pages#archives', as: 'archives'
  get '/committee_primer', to: 'pages#committee_primer', as: 'committee_primer'
  # get '/*path' => 'pages#landing'

end
