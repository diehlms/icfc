require 'rails_helper'

RSpec.describe Api::V1::AuthenticationsController, type: :controller do
  let(:user) { create(:user, password: 'StrongPass123') }
  let(:valid_login_params) { { email: user.email, password: 'StrongPass123' } }
  let(:invalid_login_params) { { email: user.email, password: 'wrongpassword' } }
  let(:valid_signup_params) do
    {
      user: {
        username: 'newuser',
        firstname: 'John',
        lastname: 'Doe',
        email: 'newuser@example.com',
        phone_number: '555-123-4567',
        password: 'StrongPass123',
        password_confirmation: 'StrongPass123'
      }
    }
  end
  let(:invalid_signup_params) do
    {
      user: {
        username: '',
        email: 'invalid-email',
        password: 'weak'
      }
    }
  end

  describe 'POST #login' do
    context 'with valid credentials' do
      it 'returns a JWT token' do
        post :login, params: valid_login_params
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response).to have_key('token')
        expect(json_response['token']).to be_a(String)
      end

      it 'includes user information in token' do
        post :login, params: valid_login_params
        json_response = JSON.parse(response.body)
        token = json_response['token']
        
        decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, { algorithm: 'HS256' })
        payload = decoded_token.first
        
        expect(payload['user_id']).to eq(user.id)
        expect(payload['email']).to eq(user.email)
        expect(payload['first_name']).to eq(user.firstname)
        expect(payload['last_name']).to eq(user.lastname)
      end
    end

    context 'with invalid email' do
      it 'returns unauthorized' do
        post :login, params: { email: 'nonexistent@example.com', password: 'password' }
        expect(response).to have_http_status(:unauthorized)
        
        json_response = JSON.parse(response.body)
        expect(json_response['error']).to eq('unauthorized')
      end
    end

    context 'with invalid password' do
      it 'returns unauthorized' do
        post :login, params: invalid_login_params
        expect(response).to have_http_status(:unauthorized)
        
        json_response = JSON.parse(response.body)
        expect(json_response['error']).to eq('unauthorized')
      end
    end

    context 'with missing parameters' do
      it 'returns unauthorized for missing email' do
        post :login, params: { password: 'password' }
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns unauthorized for missing password' do
        post :login, params: { email: user.email }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with case insensitive email' do
      it 'finds user regardless of email case' do
        post :login, params: { email: user.email.upcase, password: 'StrongPass123' }
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'POST #signup' do
    context 'with valid parameters' do
      before do
        allow(UserMailer).to receive(:registration_confirmation).and_return(double(deliver: true))
        allow(UserMailer).to receive(:new_member_notification).and_return(double(deliver: true))
      end

      it 'creates a new user' do
        expect {
          post :signup, params: valid_signup_params
        }.to change(User, :count).by(1)

        expect(response).to have_http_status(:ok)
      end

      it 'sends registration confirmation email' do
        expect(UserMailer).to receive(:registration_confirmation).and_return(double(deliver: true))
        post :signup, params: valid_signup_params
      end

      it 'sends new member notification email' do
        expect(UserMailer).to receive(:new_member_notification).and_return(double(deliver: true))
        post :signup, params: valid_signup_params
      end

      it 'returns empty JSON response' do
        post :signup, params: valid_signup_params
        expect(JSON.parse(response.body)).to eq({})
      end
    end

    context 'with invalid parameters' do
      it 'does not create a user' do
        expect {
          post :signup, params: invalid_signup_params
        }.not_to change(User, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns validation errors' do
        post :signup, params: invalid_signup_params
        json_response = JSON.parse(response.body)
        expect(json_response).to have_key('username')
        expect(json_response).to have_key('email')
        expect(json_response).to have_key('password')
      end
    end

    context 'with duplicate email' do
      before do
        create(:user, email: 'existing@example.com')
      end

      it 'returns validation error' do
        params = valid_signup_params.deep_dup
        params[:user][:email] = 'existing@example.com'
        
        post :signup, params: params
        expect(response).to have_http_status(:unprocessable_entity)
        
        json_response = JSON.parse(response.body)
        expect(json_response['email']).to include('has already been taken')
      end
    end

    context 'with duplicate username' do
      before do
        create(:user, username: 'existinguser')
      end

      it 'returns validation error' do
        params = valid_signup_params.deep_dup
        params[:user][:username] = 'existinguser'
        
        post :signup, params: params
        expect(response).to have_http_status(:unprocessable_entity)
        
        json_response = JSON.parse(response.body)
        expect(json_response['username']).to include('has already been taken')
      end
    end
  end

  describe 'GET #confirm_email' do
    let(:user_with_token) { create(:user, confirm_token: 'valid-token') }

    context 'with valid confirmation token' do
      before do
        allow(User).to receive(:find_by_confirm_token).with('valid-token').and_return(user_with_token)
      end

      it 'activates the user email' do
        get :confirm_email, params: { token: 'valid-token' }
        expect(response).to have_http_status(:ok)
        
        user_with_token.reload
        expect(user_with_token.email_confirmed).to be_truthy
        expect(user_with_token.confirm_token).to be_nil
      end

      it 'returns empty JSON response' do
        get :confirm_email, params: { token: 'valid-token' }
        expect(JSON.parse(response.body)).to eq({})
      end
    end

    context 'with invalid confirmation token' do
      before do
        allow(User).to receive(:find_by_confirm_token).with('invalid-token').and_return(nil)
      end

      it 'returns not found' do
        get :confirm_email, params: { token: 'invalid-token' }
        expect(response).to have_http_status(:not_found)
        
        json_response = JSON.parse(response.body)
        expect(json_response['error']).to eq('User not found')
      end
    end

    context 'when email activation fails' do
      before do
        allow(User).to receive(:find_by_confirm_token).with('valid-token').and_return(user_with_token)
        allow(user_with_token).to receive(:email_activate).and_return(false)
      end

      it 'returns unprocessable entity' do
        get :confirm_email, params: { token: 'valid-token' }
        expect(response).to have_http_status(:unprocessable_entity)
        
        json_response = JSON.parse(response.body)
        expect(json_response['error']).to eq('Email activation failed')
      end
    end
  end

  describe 'parameter handling' do
    it 'permits correct user parameters' do
      params = {
        user: {
          username: 'testuser',
          firstname: 'Test',
          lastname: 'User',
          email: 'test@example.com',
          phone_number: '555-123-4567',
          password: 'StrongPass123',
          password_confirmation: 'StrongPass123',
          confirm_token: 'token',
          password_reset_token: 'reset-token',
          verified: true
        }
      }

      post :signup, params: params
      expect(response).to have_http_status(:ok)
    end
  end
end