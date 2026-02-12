require 'rails_helper'

RSpec.describe 'Api::V1::Cabins', type: :request do
  let(:user) { create(:user) }
  let(:cabin) { create(:cabin, user: user) }
  let(:valid_headers) { { 'Authorization' => "Bearer #{generate_token(user)}" } }
  let(:invalid_headers) { { 'Authorization' => 'Bearer invalid_token' } }

  def generate_token(user)
    JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base, 'HS256')
  end

  describe 'GET /api/v1/cabins' do
    context 'with valid authentication' do
      before do
        create_list(:cabin, 3)
      end

      it 'returns all cabins' do
        get '/api/v1/cabins', headers: valid_headers
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response).to be_an(Array)
        expect(json_response.length).to eq(4) # 3 created + 1 from let
        expect(json_response.first).to include('id', 'name', 'bedrooms')
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        get '/api/v1/cabins', headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'without authentication' do
      it 'returns unauthorized' do
        get '/api/v1/cabins'
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/cabins' do
    let(:valid_params) { { cabin: { name: 'New Cabin', bedrooms: '3', user_id: user.id } } }
    let(:invalid_params) { { cabin: { name: '', bedrooms: '' } } }

    context 'with valid authentication and parameters' do
      it 'creates a new cabin' do
        expect {
          post '/api/v1/cabins', params: valid_params, headers: valid_headers
        }.to change(Cabin, :count).by(1)

        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response['name']).to eq('New Cabin')
        expect(json_response['bedrooms']).to eq('3')
      end
    end

    context 'with invalid parameters' do
      it 'does not create a cabin' do
        expect {
          post '/api/v1/cabins', params: invalid_params, headers: valid_headers
        }.not_to change(Cabin, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        post '/api/v1/cabins', params: valid_params, headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/cabins/:id' do
    context 'with valid authentication' do
      it 'returns the cabin' do
        get "/api/v1/cabins/#{cabin.id}", headers: valid_headers
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response['id']).to eq(cabin.id)
        expect(json_response['name']).to eq(cabin.name)
        expect(json_response['bedrooms']).to eq(cabin.bedrooms)
      end

      it 'returns not found for non-existent cabin' do
        get '/api/v1/cabins/999999', headers: valid_headers
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        get "/api/v1/cabins/#{cabin.id}", headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PUT /api/v1/cabins/:id' do
    let(:valid_params) { { cabin: { name: 'Updated Cabin', bedrooms: '4' } } }
    let(:invalid_params) { { cabin: { name: '', bedrooms: '' } } }

    context 'with valid authentication and parameters' do
      it 'updates the cabin' do
        put "/api/v1/cabins/#{cabin.id}", params: valid_params, headers: valid_headers
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Cabin updated!')
        
        cabin.reload
        expect(cabin.name).to eq('Updated Cabin')
        expect(cabin.bedrooms).to eq('4')
      end

      it 'returns unprocessable entity for invalid parameters' do
        put "/api/v1/cabins/#{cabin.id}", params: invalid_params, headers: valid_headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end

    context 'when updating another user\'s cabin' do
      let(:other_user) { create(:user) }
      let(:other_cabin) { create(:cabin, user: other_user) }

      it 'returns unauthorized' do
        put "/api/v1/cabins/#{other_cabin.id}", params: valid_params, headers: valid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        put "/api/v1/cabins/#{cabin.id}", params: valid_params, headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/cabins/:id' do
    context 'with valid authentication' do
      it 'deletes the cabin' do
        expect {
          delete "/api/v1/cabins/#{cabin.id}", headers: valid_headers
        }.to change(Cabin, :count).by(-1)

        expect(response).to have_http_status(:no_content)
      end

      it 'returns not found for non-existent cabin' do
        delete '/api/v1/cabins/999999', headers: valid_headers
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when deleting another user\'s cabin' do
      let(:other_user) { create(:user) }
      let(:other_cabin) { create(:cabin, user: other_user) }

      it 'returns unauthorized' do
        delete "/api/v1/cabins/#{other_cabin.id}", headers: valid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with invalid authentication' do
      it 'returns unauthorized' do
        delete "/api/v1/cabins/#{cabin.id}", headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'parameter handling' do
    it 'accepts all permitted parameters' do
      params = {
        cabin: {
          name: 'Test Cabin',
          bedrooms: '3',
          washerdryer: true,
          dock: false,
          user_id: user.id,
          price_per_week: 1000,
          price_per_day: 150,
          description: 'A beautiful cabin by the lake'
        }
      }

      post '/api/v1/cabins', params: params, headers: valid_headers
      expect(response).to have_http_status(:ok)
      
      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq('Test Cabin')
      expect(json_response['bedrooms']).to eq('3')
    end
  end

  describe 'response format' do
    it 'returns JSON content type' do
      get '/api/v1/cabins', headers: valid_headers
      expect(response.content_type).to include('application/json')
    end

    it 'handles malformed JSON gracefully' do
      put "/api/v1/cabins/#{cabin.id}", 
          params: 'invalid json', 
          headers: valid_headers.merge({ 'CONTENT_TYPE' => 'application/json' })
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe 'error handling' do
    context 'when cabin update fails' do
      before do
        allow_any_instance_of(Cabin).to receive(:update!).and_raise(ActiveRecord::RecordInvalid.new(Cabin.new))
      end

      it 'returns unprocessable entity' do
        put "/api/v1/cabins/#{cabin.id}", params: { cabin: { name: 'Test' } }, headers: valid_headers
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end