# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api do
    namespace :v1 do
      post '/auth/login', to: 'authentications#login'
      post '/auth/signup', to: 'authentications#signup'
      post '/auth/confirm_email/:token', to: 'authentications#confirm_email'

      get '/entry/initial_payload', to: 'entry#initial_payload'
      get '/entry/campers', to: 'entry#campers'
      get '/entry/recent_articles', to: 'entry#recent_articles'
      get '/entry/this_weeks_events', to: 'entry#this_weeks_events'
      put '/family_members', to: 'family_members#update'
      post '/search', to: 'search#search'
      post '/toggle_maintenance', to: 'maintenances#toggle'
    
      get '/password_resets/init_reset_password', to: 'password_resets#init_reset_password'
      post '/password_resets', to: 'password_resets#create'
      put '/password_resets', to: 'password_resets#update'

      resources :articles do
        member do
          patch :upload_image
        end
      end
      resources :logs, only: :index
      resources :authentications
      resources :cabin_attachments
      resources :camp_messages
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
      resources :rideshares
      resources :search
      resources :sessions
      resources :users
    end
  end

  get 'metrics', to: 'metrics#index'
  match '*path', to: redirect('/'), via: :all
end
