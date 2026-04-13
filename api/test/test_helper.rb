# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

module ActiveSupport
  class TestCase
    fixtures :all
    
    def generate_token(user)
      JWT.encode({ user_id: user.id }, Rails.application.secret_key_base, 'HS256')
    end

    def auth_headers(user)
      { 'Authorization' => "Bearer #{generate_token(user)}" }
    end

    def json_response
      JSON.parse(@response.body)
    end

    def assert_json_response
      assert_equal 'application/json', @response.content_type
      assert_nothing_raised { json_response }
    end

    def assert_unauthorized
      assert_response :unauthorized
    end

    def assert_not_found
      assert_response :not_found
    end

    def assert_unprocessable_entity
      assert_response :unprocessable_entity
    end

    def assert_success
      assert_response :success
    end

    def assert_created
      assert_response :created
    end

    def assert_no_content
      assert_response :no_content
    end
  end
end
