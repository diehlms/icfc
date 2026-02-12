# frozen_string_literal: true

module TestHelpers
  def generate_token(user)
    JWT.encode({ user_id: user.id }, Rails.application.secrets.secret_key_base, 'HS256')
  end

  def auth_headers(user)
    { 'Authorization' => "Bearer #{generate_token(user)}" }
  end

  def invalid_auth_headers
    { 'Authorization' => 'Bearer invalid_token' }
  end

  def json_response
    JSON.parse(response.body)
  end

  def expect_json_response
    expect(response.content_type).to include('application/json')
    expect { json_response }.not_to raise_error
  end

  def expect_unauthorized
    expect(response).to have_http_status(:unauthorized)
  end

  def expect_not_found
    expect(response).to have_http_status(:not_found)
  end

  def expect_unprocessable_entity
    expect(response).to have_http_status(:unprocessable_entity)
  end

  def expect_success
    expect(response).to have_http_status(:ok)
  end

  def expect_created
    expect(response).to have_http_status(:created)
  end

  def expect_no_content
    expect(response).to have_http_status(:no_content)
  end
end

RSpec.configure do |config|
  config.include TestHelpers, type: :request
  config.include TestHelpers, type: :controller
end