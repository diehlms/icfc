require 'test_helper'

class AuthenticationsControllerTest < ActionDispatch::IntegrationTest
  # Setup initial users if needed
  def setup
    @user = users(:one) # Assuming you have a fixture for a user
    @unconfirmed_user = users(:unconfirmed) # An unconfirmed user for testing email confirmation
  end

  test "should log in with valid credentials" do
    post api_v1_auth_login_url, 
         params: { email: @user.email, password: 'password' } # Make sure the fixture uses this password
    assert_response :ok

    response_data = JSON.parse(@response.body)
    assert_not_nil response_data['token']
  end

  test "should not log in with invalid credentials" do
    post api_v1_auth_login_url,
         params: { email: @user.email, password: 'wrong_password' }
    assert_response :unauthorized
    assert_includes @response.body, 'unauthorized'
  end

  test "should sign up a new user" do
    assert_difference('User.count', 1) do
      post api_v1_auth_signup_url,
           params: { user: { username: 'newuser', firstname: 'First', lastname: 'Last',
                             email: 'newuser@example.com', phone_number: '1234567890',
                             password: 'Password1234!', password_confirmation: 'Password1234!' } }
    end
    assert_response :ok
  end

  test "should not sign up with invalid data" do
    assert_no_difference('User.count') do
      post api_v1_auth_signup_url,
           params: { user: { email: 'invalid_email', password: 'short' } } # Invalid email and password
    end
    assert_response :unprocessable_entity
  end

  test "should confirm email with valid token" do
    post api_v1_auth_confirm_email_url,
        params: { token: @unconfirmed_user.confirm_token }
    assert_response :ok
  end

  test "should not confirm email with invalid token" do
    post api_v1_auth_confirm_email_url,
        params: { token: 'invalid_token' }
    assert_response :not_found
    assert_includes @response.body, 'User not found'
  end
end