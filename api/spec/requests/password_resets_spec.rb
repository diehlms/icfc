# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PasswordResets', type: :request do
  let(:user) { create(:user) }

  describe 'GET /forgot-password' do
    it 'renders the form' do
      get '/forgot-password'
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST /forgot-password' do
    context 'with a known email' do
      it 'sends a reset email and redirects to login' do
        expect(UserMailer).to receive(:password_reset).with(user).and_return(double(deliver: true))
        post '/forgot-password', params: { email: user.email }
        expect(response).to redirect_to('/login')
      end
    end

    context 'with an unknown email' do
      it 'renders the form with an alert' do
        post '/forgot-password', params: { email: 'nobody@example.com' }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'GET /reset-password' do
    context 'with a valid token' do
      it 'renders the password reset form' do
        get '/reset-password', params: { token: user.password_reset_token }
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with an invalid token' do
      it 'redirects to the forgot-password page' do
        get '/reset-password', params: { token: 'invalid' }
        expect(response).to redirect_to('/forgot-password')
      end
    end
  end

  describe 'PATCH /reset-password' do
    let(:valid_params) { { user: { password: 'NewPass456', password_confirmation: 'NewPass456' } } }
    let(:mismatched_params) { { user: { password: 'NewPass456', password_confirmation: 'wrong' } } }

    context 'with a valid token and matching passwords' do
      it 'updates the password and redirects to root' do
        patch '/reset-password', params: valid_params.merge(token: user.password_reset_token)
        expect(response).to redirect_to('/')
      end

      it 'signs the user in' do
        patch '/reset-password', params: valid_params.merge(token: user.password_reset_token)
        expect(session[:user_id]).to eq(user.id)
      end
    end

    context 'with a valid token but mismatched passwords' do
      it 'renders the edit form' do
        patch '/reset-password', params: mismatched_params.merge(token: user.password_reset_token)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with an invalid token' do
      it 'redirects to the forgot-password page' do
        patch '/reset-password', params: valid_params.merge(token: 'invalid')
        expect(response).to redirect_to('/forgot-password')
      end
    end
  end
end
