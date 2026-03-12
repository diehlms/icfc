require 'rails_helper'

RSpec.describe 'Users', type: :request do
  let(:user) { create(:user) }

  describe 'GET /api/v1/users' do
    it 'requires authentication' do
      get '/api/v1/users'
      expect_unauthorized
    end

    it 'returns a list of users' do
      create_list(:user, 2)
      get '/api/v1/users', headers: auth_headers(user)
      expect_success
      expect(json_response).to be_an(Array)
    end
  end

  describe 'GET /api/v1/users/:id' do
    it 'requires authentication' do
      get "/api/v1/users/#{user.id}"
      expect_unauthorized
    end

    it 'returns the requested user' do
      get "/api/v1/users/#{user.id}", headers: auth_headers(user)
      expect_success
      expect(json_response['id']).to eq(user.id)
      expect(json_response['email']).to eq(user.email)
    end

    it 'returns not found for a non-existent user' do
      get '/api/v1/users/9999999', headers: auth_headers(user)
      expect_not_found
    end

    it 'returns unauthorized for an invalid token' do
      get "/api/v1/users/#{user.id}", headers: invalid_auth_headers
      expect_unauthorized
    end
  end
end
