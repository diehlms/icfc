# frozen_string_literal: true

# == Route Map
#

Rails.application.routes.draw do
  root 'home#index'

  get  'login',    to: 'sessions#new',     as: :login
  post 'login',    to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy', as: :logout

  get  'signup',   to: 'registrations#new',    as: :signup
  post 'signup',   to: 'registrations#create'

  get  'forgot-password',  to: 'password_resets#new',    as: :new_password_reset
  post 'forgot-password',  to: 'password_resets#create'
  get  'reset-password',   to: 'password_resets#edit',   as: :edit_password_reset
  patch 'reset-password',  to: 'password_resets#update'

  get 'confirm-email', to: 'confirm_emails#show', as: :confirm_email

  resources :articles do
    member do
      patch :upload_image
    end
    resources :comments, only: %i[create destroy]
  end

  resources :events
  resources :cabins do
    resources :cabin_dates, only: %i[create destroy]
    resources :cabin_attachments, only: %i[create destroy]
  end
  resources :rideshares
  resources :location_points, only: %i[new create]
  resources :charts, only: %i[index new create destroy]
  resources :family_trees do
    resources :family_members, only: %i[create edit update destroy]
  end
  resources :galleries, only: %i[index create destroy]
  resources :documents, only: %i[index create destroy]

  resources :camp_messages, only: %i[create destroy]

  resources :users, only: %i[index show update destroy] do
    member do
      patch :verify
    end
  end

  get  'profile',       to: 'profile#show',   as: :profile
  patch 'profile',      to: 'profile#update'

  get 'search',         to: 'search#index',   as: :search

  get 'camp-info',                   to: 'camp_info#index',             as: :camp_info
  get 'camp-info/history',           to: 'camp_info#history',           as: :camp_info_history
  get 'camp-info/customs',           to: 'camp_info#customs',           as: :camp_info_customs
  get 'camp-info/membership',        to: 'camp_info#membership',        as: :camp_info_membership
  get 'camp-info/committees',        to: 'camp_info#committees',        as: :camp_info_committees
  get 'camp-info/bylaws',            to: 'camp_info#bylaws',            as: :camp_info_bylaws
  get 'camp-info/charitable-giving', to: 'camp_info#charitable_giving', as: :camp_info_charitable_giving
  get 'camp-info/family-agreements', to: 'camp_info#family_agreements', as: :camp_info_family_agreements
  get 'camp-info/planned-giving',    to: 'camp_info#planned_giving',    as: :camp_info_planned_giving
  get 'camp-info/forms',             to: 'camp_info#forms',             as: :camp_info_forms
  get 'camp-info/archives',          to: 'camp_info#archives',          as: :camp_info_archives

  get 'metrics', to: 'metrics#index'
end
