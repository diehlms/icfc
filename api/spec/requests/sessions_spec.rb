# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Sessions', type: :request do
  let(:password) { 'StrongPass123' }
  let!(:user) { create(:user, email: 'john.doe@example.com', username: 'johndoe', password: password, password_confirmation: password) }

  describe 'GET /login' do
    it 'renders the login form' do
      get '/login'
      expect(response).to have_http_status(:ok)
    end

    it 'redirects to root when already logged in' do
      post '/login', params: { email: user.email, password: password }
      get '/login'
      expect(response).to redirect_to('/')
    end
  end

  describe 'POST /login' do
    context 'with exact email' do
      it 'logs in successfully' do
        post '/login', params: { email: 'john.doe@example.com', password: password }
        expect(response).to redirect_to('/')
        expect(session[:user_id]).to eq(user.id)
      end
    end

    context 'with email containing whitespace and mixed case' do
      it 'logs in successfully' do
        post '/login', params: { email: '  JOHN.DOE@EXAMPLE.COM  ', password: password }
        expect(response).to redirect_to('/')
        expect(session[:user_id]).to eq(user.id)
      end
    end

    context 'with username instead of email' do
      it 'fails to log in and re-renders new' do
        post '/login', params: { email: 'johndoe', password: password }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(session[:user_id]).to be_nil
      end
    end

    context 'with invalid password' do
      it 'fails to log in and re-renders new' do
        post '/login', params: { email: user.email, password: 'WrongPassword999' }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(session[:user_id]).to be_nil
      end
    end

    context 'with non-existent login' do
      it 'fails to log in and re-renders new' do
        post '/login', params: { email: 'nobody@example.com', password: password }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(session[:user_id]).to be_nil
      end
    end
  end

  describe 'DELETE /logout' do
    it 'clears the session and redirects to login' do
      post '/login', params: { email: user.email, password: password }
      expect(session[:user_id]).to eq(user.id)

      delete '/logout'
      expect(session[:user_id]).to be_nil
      expect(response).to redirect_to('/login')
    end
  end
end
