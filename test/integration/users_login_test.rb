require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest
    def setup
        @user = users(:diehl)
    end

    # test "login with valid info followed by logout" do
    #     get login_path
    #     post login_path, params: { session: { email: @user.email,
    #                                           password: 'password' } }
    #     assert_redirected_to root_path
    #     delete session
    #     assert_redirect_to root_path
    #     delete session
    # end

end