# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api do
    namespace :v1 do
      post '/auth/login', to: 'authentications#login'
      post '/auth/signup', to: 'authentications#signup'

      get '/entry/initial_payload', to: 'entry#initial_payload'
      get '/entry/campers', to: 'entry#campers'
      get '/entry/recent_articles', to: 'entry#recent_articles'
      get '/entry/this_weeks_events', to: 'entry#this_weeks_events'

      put '/family_members', to: 'family_members#update'
      post '/search', to: 'search#search'

      resources :articles do
        member do
          patch :upload_image
        end
      end
      resources :authentications
      resources :cabin_attachments
      resources :cabin_dates
      resources :cabins
      resources :charts
      resources :comments
      resources :committees
      resources :documents
      resources :events
      resources :family_members
      resources :family_trees
      resources :galleries
      resources :location_points
      resources :password_resets
      resources :rideshares
      resources :search
      resources :sessions
      resources :users
    end
  end

  # namespace :api do
  #   namespace :v1 do
  #     get '/articles/index'
  #     get '/users/index'
  #     get '/charts/index'
  #     get '/rideshares/index'
  #     get '/location_points/index'
  #     get '/documents/index/:document_folder', to: 'documents#index'
  #     get '/entry/initial_payload', to: 'entry#initial_payload'
  #     get '/entry/campers', to: 'entry#campers'
  #     get '/entry/recent_articles', to: 'entry#recent_articles'
  #     get '/entry/this_weeks_events', to: 'entry#this_weeks_events'
  #     get '/committees', to: 'committees#index'

  #     post '/articles/create'
  #     post '/users/create'
  #     post '/charts/create'
  #     post '/documents/create'
  #     post '/rideshares/create'
  #     post '/location_points/create'
  #     post '/committees/create'
  #     post '/family_trees/create'
  #     post '/family_members/create'

  #     get '/articles/:id', to: 'articles#show'
  #     get '/users/:id', to: 'users#show'
  #     get '/users/profile/:id', to: 'users#profile'
  #     get '/pictures/:id', to: 'pictures#show'
  #     get '/charts/:id', to: 'chart#show'
  #     get '/location_points/get_single/:id', to: 'location_points#single'
  #     get '/family_trees/:id', to: 'family_trees#show'

  #     delete '/rideshares/destroy/:id', to: 'rideshares#destroy'
  #     delete '/documents/destroy/:id', to: 'documents#destroy'
  #     delete '/articles/destroy/:id', to: 'articles#destroy'
  #     delete '/charts/destroy/:id', to: 'charts#destroy'
  #     delete '/location_points/destroy/:id', to: 'location_points#destroy'
  #     delete '/committees/destroy/:id', to: 'committees#destroy'

  #     resources :users, only: %i[create show index]
  #     resources :articles, only: %i[create show index destroy]
  #     resources :charts, only: %i[create show index destroy]
  #     resources :rideshares
  #     resources :location_points
  #     resources :committees

  #     resources :family_trees, only: %i[index show create] do
  #       resources :family_members, only: [:create]
  #     end
  #   end
  # end

  # get '/login', to: 'sessions#new', as: 'login'
  # delete '/logout', to: 'sessions#destroy', as: 'logout'
  # post '/login', to: 'sessions#create'
  # get '/signup', to: 'users#new', as: 'signup'
  # resources :password_resets, only: %i[new create edit update]
  # resources :users do
  #   member do
  #     get :confirm_email
  #     post :toggle_verified
  #   end
  # end
  # resources :search, only: [:index]
  # resources :sessions, only: %i[new create destroy]
  # root 'pages#home'

  # resources :cabin_attachments
  # resources :articles do
  #   member do
  #     post :toggle_pinned
  #   end
  # end
  # resources :comments
  # resources :events
  # resources :cabins
  # resources :cabindates
  # resources :galleries
  # resources :rooms
  # resources :room_messages

  # get '/articles', to: 'articles#index'
  # get '/blog', to: 'articles#index'
  # get '/users', to: 'users#index'
  # get '/search', to: 'pages#search', as: 'search'

  # match '*path' => 'pages#home', via: :all
end
