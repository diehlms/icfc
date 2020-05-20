require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest
    def setup
        @user = users(:diehl)
    end

    def log_in_as(user, password: @user.password_digest, remember_digest: '1')
        post login_path, params: { session: { email: @user.email,
                                              password: password,
                                              remember_digest: remember_me } }
        assert_response :success
    end

end