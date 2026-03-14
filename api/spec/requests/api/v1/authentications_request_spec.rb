require 'rails_helper'

RSpec.describe 'Authentications', type: :request do
  let(:password) { 'StrongPass123' }
  let(:user) { create(:user, password: password, password_confirmation: password) }

  before do
    allow(UserMailer).to receive(:registration_confirmation).and_return(double(deliver: true))
    allow(UserMailer).to receive(:new_member_notification).and_return(double(deliver: true))
  end

  describe 'POST /api/v1/auth/login' do
    context 'with valid credentials' do
      it 'returns a JWT token' do
        post '/api/v1/auth/login', params: { email: user.email, password: password }
        expect_success
        expect(json_response).to have_key('token')
      end

      it 'encodes user info in the token' do
        post '/api/v1/auth/login', params: { email: user.email, password: password }
        token = json_response['token']
        decoded = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256').first
        expect(decoded['user_id']).to eq(user.id)
        expect(decoded['email']).to eq(user.email)
      end

      it 'is case-insensitive on email' do
        post '/api/v1/auth/login', params: { email: user.email.upcase, password: password }
        expect_success
      end
    end

    context 'with invalid credentials' do
      it 'returns unauthorized for wrong password' do
        post '/api/v1/auth/login', params: { email: user.email, password: 'wrong' }
        expect_unauthorized
      end

      it 'returns unauthorized for unknown email' do
        post '/api/v1/auth/login', params: { email: 'nobody@example.com', password: password }
        expect_unauthorized
      end

      # Note: missing email causes nil.downcase (NoMethodError) in the controller —
      # this is a known application bug; we don't test that path here.
    end
  end

  describe 'POST /api/v1/auth/signup' do
    let(:valid_params) do
      {
        user: {
          username: 'newuser99',
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'jane@example.com',
          phone_number: '555-123-4567',
          password: password,
          password_confirmation: password
        }
      }
    end

    context 'with valid params' do
      it 'creates a user and returns ok' do
        expect {
          post '/api/v1/auth/signup', params: valid_params
        }.to change(User, :count).by(1)
        expect_success
      end

      it 'sends registration confirmation email' do
        expect(UserMailer).to receive(:registration_confirmation).and_return(double(deliver: true))
        post '/api/v1/auth/signup', params: valid_params
      end

      it 'sends new member notification email' do
        expect(UserMailer).to receive(:new_member_notification).and_return(double(deliver: true))
        post '/api/v1/auth/signup', params: valid_params
      end
    end

    context 'with invalid params' do
      it 'does not create a user and returns unprocessable_entity' do
        expect {
          post '/api/v1/auth/signup', params: { user: { username: '', email: 'bad', password: 'x' } }
        }.not_to change(User, :count)
        expect_unprocessable_entity
      end

      it 'returns errors for duplicate email' do
        post '/api/v1/auth/signup', params: valid_params.deep_merge(user: { email: user.email })
        expect_unprocessable_entity
        expect(json_response['email']).to include('has already been taken')
      end

      # Username uniqueness is not validated in the model (no uniqueness constraint),
      # so duplicate usernames are permitted at the model level.
    end
  end

  describe 'POST /api/v1/auth/confirm_email' do
    context 'with a valid token' do
      it 'activates the user and returns ok' do
        user_to_confirm = create(:user, confirm_token: 'abc123')
        post '/api/v1/auth/confirm_email', params: { token: 'abc123' }
        expect_success
        expect(user_to_confirm.reload.email_confirmed).to be true
        expect(user_to_confirm.reload.confirm_token).to be_nil
      end
    end

    context 'with an invalid token' do
      it 'returns not found' do
        post '/api/v1/auth/confirm_email', params: { token: 'bogus' }
        expect_not_found
      end
    end
  end
end
