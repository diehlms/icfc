require 'rails_helper'

RSpec.describe 'Api::V1::Users', type: :request do
  let(:user) { create(:user) }
  let(:valid_headers) { { 'Authorization' => "Bearer #{generate_token(user)}" } }
  let(:invalid_headers) { { 'Authorization' => 'Bearer invalid_token' } }

  def generate_token(user)
    JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base, 'HS256')
  end

  describe 'GET /api/v1/users' do
    context 'with valid authentication' do
      before do
        create_list(:user, 3)
      end

      it 'returns all users' do
        get '/api/v1/users', headers: valid_headers
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response).to be_an(Array)
        expect(json_response.length).to eq(4) # 3 created + 1 from let
        expect(json_response.first).to include('id', 'username', 'email')
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        get '/api/v1/users', headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'without authentication' do
      it 'returns unauthorized' do
        get '/api/v1/users'
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/users/:id' do
    context 'with valid authentication' do
      it 'returns the user' do
        get "/api/v1/users/#{user.id}", headers: valid_headers
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response['id']).to eq(user.id)
        expect(json_response['username']).to eq(user.username)
        expect(json_response['email']).to eq(user.email)
      end

      it 'returns not found for non-existent user' do
        get '/api/v1/users/999999', headers: valid_headers
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        get "/api/v1/users/#{user.id}", headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PUT /api/v1/users/:id' do
    let(:valid_params) { { user: { firstname: 'Updated', lastname: 'Name' } } }
    let(:invalid_params) { { user: { email: 'invalid-email' } } }

    context 'with valid authentication and parameters' do
      it 'updates the user' do
        put "/api/v1/users/#{user.id}", params: valid_params, headers: valid_headers
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('User updated!')
        
        user.reload
        expect(user.firstname).to eq('Updated')
        expect(user.lastname).to eq('Name')
      end

      it 'returns unprocessable entity for invalid parameters' do
        put "/api/v1/users/#{user.id}", params: invalid_params, headers: valid_headers
        expect(response).to have_http_status(:unprocessable_entity)
        
        json_response = JSON.parse(response.body)
        expect(json_response).to have_key('errors')
      end
    end

    context 'when updating another user' do
      let(:other_user) { create(:user) }

      it 'returns unauthorized' do
        put "/api/v1/users/#{other_user.id}", params: valid_params, headers: valid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        put "/api/v1/users/#{user.id}", params: valid_params, headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/users/:id' do
    context 'with valid authentication' do
      it 'deletes the user' do
        delete "/api/v1/users/#{user.id}", headers: valid_headers
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('User deleted!')
        
        expect { User.find(user.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it 'returns not found for non-existent user' do
        delete '/api/v1/users/999999', headers: valid_headers
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when deleting another user' do
      let(:other_user) { create(:user) }

      it 'returns unauthorized' do
        delete "/api/v1/users/#{other_user.id}", headers: valid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        delete "/api/v1/users/#{user.id}", headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/users/confirm_email/:token' do
    let(:user_with_token) { create(:user, confirm_token: 'valid-token') }

    context 'with valid confirmation token' do
      before do
        allow(User).to receive(:find_by_confirm_token).with('valid-token').and_return(user_with_token)
      end

      it 'activates the user email' do
        get '/api/v1/users/confirm_email/valid-token'
        expect(response).to have_http_status(:ok)
        
        user_with_token.reload
        expect(user_with_token.email_confirmed).to be_truthy
        expect(user_with_token.confirm_token).to be_nil
      end
    end

    context 'with invalid confirmation token' do
      before do
        allow(User).to receive(:find_by_confirm_token).with('invalid-token').and_return(nil)
      end

      it 'does not activate any user' do
        get '/api/v1/users/confirm_email/invalid-token'
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'POST /api/v1/users/:id/toggle_verified' do
    let(:unverified_user) { create(:user, verified: false) }

    context 'with valid authentication' do
      before do
        allow(UserMailer).to receive(:verified_confirmation).and_return(double(deliver: true))
      end

      it 'toggles the verified status' do
        post "/api/v1/users/#{unverified_user.id}/toggle_verified", headers: valid_headers
        expect(response).to have_http_status(:ok)
        
        unverified_user.reload
        expect(unverified_user.verified).to be_truthy
      end

      it 'sends verification confirmation email' do
        expect(UserMailer).to receive(:verified_confirmation).with(unverified_user).and_return(double(deliver: true))
        post "/api/v1/users/#{unverified_user.id}/toggle_verified", headers: valid_headers
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        post "/api/v1/users/#{unverified_user.id}/toggle_verified", headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'response format' do
    it 'returns JSON content type' do
      get '/api/v1/users', headers: valid_headers
      expect(response.content_type).to include('application/json')
    end

    it 'handles malformed JSON gracefully' do
      put "/api/v1/users/#{user.id}", 
          params: 'invalid json', 
          headers: valid_headers.merge({ 'CONTENT_TYPE' => 'application/json' })
      expect(response).to have_http_status(:bad_request)
    end
  end
end