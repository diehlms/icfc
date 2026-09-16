# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PasswordResets', type: :request do
  include ActiveSupport::Testing::TimeHelpers

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
        expect(UserMailer).to receive(:password_reset).and_return(double(deliver: true))
        post '/forgot-password', params: { email: user.email }
        expect(response).to redirect_to('/login')
      end

      it 'works with email containing whitespace and mixed case' do
        expect(UserMailer).to receive(:password_reset).and_return(double(deliver: true))
        post '/forgot-password', params: { email: "  #{user.email.upcase}  " }
        expect(response).to redirect_to('/login')
      end

      it 'works when providing username instead of email' do
        expect(UserMailer).to receive(:password_reset).and_return(double(deliver: true))
        post '/forgot-password', params: { email: user.username }
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
    let(:token) { user.password_reset_token }

    context 'with a valid token' do
      it 'renders the password reset form' do
        get '/reset-password', params: { token: token }
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with an invalid token' do
      it 'redirects to the forgot-password page' do
        get '/reset-password', params: { token: 'invalid' }
        expect(response).to redirect_to('/forgot-password')
      end
    end

    context 'with a blank token' do
      it 'redirects to the forgot-password page' do
        get '/reset-password', params: { token: '' }
        expect(response).to redirect_to('/forgot-password')
      end
    end

    context 'with an expired token' do
      it 'redirects to the forgot-password page' do
        expired_token = token
        travel 3.hours do
          get '/reset-password', params: { token: expired_token }
          expect(response).to redirect_to('/forgot-password')
        end
      end
    end
  end

  describe 'PATCH /reset-password' do
    let(:token) { user.password_reset_token }
    let(:valid_params) { { user: { password: 'NewPass456', password_confirmation: 'NewPass456' } } }
    let(:mismatched_params) { { user: { password: 'NewPass456', password_confirmation: 'wrong' } } }

    context 'with a valid token and matching passwords' do
      it 'updates the password and redirects to root' do
        patch '/reset-password', params: valid_params.merge(token: token)
        expect(response).to redirect_to('/')
      end

      it 'signs the user in' do
        patch '/reset-password', params: valid_params.merge(token: token)
        expect(session[:user_id]).to eq(user.id)
      end

      it 'invalidates the reset token after password update' do
        patch '/reset-password', params: valid_params.merge(token: token)
        expect(User.find_by_password_reset_token(token)).to be_nil
      end
    end

    context 'with a valid token but mismatched passwords' do
      it 'renders the edit form' do
        patch '/reset-password', params: mismatched_params.merge(token: token)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context 'with an invalid token' do
      it 'redirects to the forgot-password page' do
        patch '/reset-password', params: valid_params.merge(token: 'invalid')
        expect(response).to redirect_to('/forgot-password')
      end
    end

    context 'with an expired token' do
      it 'redirects to the forgot-password page' do
        expired_token = token
        travel 3.hours do
          patch '/reset-password', params: valid_params.merge(token: expired_token)
          expect(response).to redirect_to('/forgot-password')
        end
      end
    end
  end
end
