require 'rails_helper'

RSpec.describe 'Cabins', type: :request do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:cabin) { create(:cabin, user: user) }

  describe 'GET /api/v1/cabins' do
    it 'requires authentication' do
      get '/api/v1/cabins'
      expect_unauthorized
    end

    it 'returns all cabins' do
      create_list(:cabin, 3, user: user)
      get '/api/v1/cabins', headers: auth_headers(user)
      expect_success
      expect(json_response).to be_an(Array)
      expect(json_response.length).to eq(3)
    end
  end

  describe 'GET /api/v1/cabins/:id' do
    it 'requires authentication' do
      get "/api/v1/cabins/#{cabin.id}"
      expect_unauthorized
    end

    it 'returns the cabin' do
      get "/api/v1/cabins/#{cabin.id}", headers: auth_headers(user)
      expect_success
      expect(json_response['id']).to eq(cabin.id)
      expect(json_response['name']).to eq(cabin.name)
    end
  end

  describe 'POST /api/v1/cabins' do
    let(:valid_params) { { cabin: { name: 'Lake House', bedrooms: '3', user_id: user.id } } }

    it 'requires authentication' do
      post '/api/v1/cabins', params: valid_params
      expect_unauthorized
    end

    it 'creates a cabin' do
      expect {
        post '/api/v1/cabins', params: valid_params, headers: auth_headers(user)
      }.to change(Cabin, :count).by(1)
      expect_success
    end

    it 'returns unprocessable entity for invalid params' do
      post '/api/v1/cabins', params: { cabin: { name: '', bedrooms: '' } }, headers: auth_headers(user)
      expect_unprocessable_entity
    end
  end

  describe 'PUT /api/v1/cabins/:id' do
    let(:params) { { cabin: { name: 'Updated Name', bedrooms: '4' } } }

    it 'requires authentication' do
      put "/api/v1/cabins/#{cabin.id}", params: params
      expect_unauthorized
    end

    it 'allows the owner to update their cabin' do
      put "/api/v1/cabins/#{cabin.id}", params: params, headers: auth_headers(user)
      expect_success
      expect(cabin.reload.name).to eq('Updated Name')
    end

    it 'forbids updating another user\'s cabin' do
      put "/api/v1/cabins/#{cabin.id}", params: params, headers: auth_headers(other_user)
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'DELETE /api/v1/cabins/:id' do
    it 'requires authentication' do
      delete "/api/v1/cabins/#{cabin.id}"
      expect_unauthorized
    end

    it 'allows the owner to delete their cabin' do
      cabin # force creation
      expect {
        delete "/api/v1/cabins/#{cabin.id}", headers: auth_headers(user).merge('Accept' => 'application/json')
      }.to change(Cabin, :count).by(-1)
    end

    it 'forbids deleting another user\'s cabin' do
      delete "/api/v1/cabins/#{cabin.id}", headers: auth_headers(other_user)
      expect(response).to have_http_status(:forbidden)
    end
  end
end
