require 'test_helper'

class Api::V1::ArticlesControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
    @another_user = users(:two)
    @admin_user = users(:admin)
    @token = JsonWebToken.encode(user_id: @user.id)
    @invalid_token = 'invalid.token.example'
  end

  test "get index page succeeds" do
    request.headers['Authorization'] = "Bearer #{@token}"
    get :index
    assert_response :success
  end
end