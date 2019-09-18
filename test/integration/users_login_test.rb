require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest

    test "login with valid info followed by logout" do
        get new_session_path
        post login_path, params: { session: { email: @user.email,
                                              password: 'password' } }
        assert logged_in?
        delete session
        assert_not logged_in?
        assert_redirect_to root_url
        delete session
    end

end