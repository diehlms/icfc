Rails.application.routes.draw do
  # namespace :api do
  #   namespace :v1 do
  #     get '/articles/index'
  #     get '/users/index'
  #     get '/events/index'
  #     get '/cabins/index'
  #     get '/search/index'
  #     get '/pictures/index'

  #     post '/articles/create'
  #     post '/users/create'
  #     post '/events/create'
  #     post '/cabins/create'
  #     post '/pictures/create'
      
  #     get '/articles/:id', to: 'articles#show'
  #     get '/users/:id', to: 'users#show'
  #     get '/events/:id', to: 'events#show'
  #     get '/cabins/:id', to: 'cabins#show'
  #     get '/pictures/:id', to: 'pictures#show'

  #     post '/login', to: 'auth#create'
  #     delete '/logout', to: 'auth#destroy'
  #     get '/logged_in', to: 'auth#is_logged_in?'
      
  #     resources :users, only: [:create, :show, :index]
  #   end
  # end

  get '/login', to: 'sessions#new', as: 'login'
  delete '/logout', to: 'sessions#destroy', as: 'logout'
  post '/login', to: 'sessions#create'
  get '/signup', to: 'users#new', as: 'signup'
  resources :password_resets
  resources :users do
    member do
      get :confirm_email
    end
  end
  resources :search, only: [:index]
  resources :sessions, only: [:new, :create, :destroy]
  root 'pages#home'

  # change to landing as home page when doing react dev
  # root 'pages#landing'
  # get '/*path' => 'pages#landing'

  
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

end
