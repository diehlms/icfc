# # frozen_string_literal: true

# require 'test_helper'

# class UsersLoginTest < ActionDispatch::IntegrationTest
#   def setup
#     ActionMailer::Base.deliveries.clear
#   end

#   test 'invalid signup information' do
#     get signup_path
#     assert_no_difference 'User.count' do
#       post users_path, params: { user: { username: '',
#                                          email: 'user@invalid',
#                                          password: 'foo',
#                                          password_confirmation: 'bar' } }
#     end
#     assert_template 'users/new'
#   end

#   test 'valid signup information' do
#     get signup_path
#     assert_difference 'User.count', 1 do
#       post users_path, params: { user: {  username: 'Example',
#                                           firstname: 'First',
#                                           lastname: 'Last',
#                                           phone_number: '1111111111',
#                                           email: 'user@example.com',
#                                           password: 'Blahblah1',
#                                           password_confirmation: 'Blahblah1' } }
#     end
#     assert_equal 2, ActionMailer::Base.deliveries.size
#     user = assigns(:user)
#     assert_not user.email_confirmed?
#     log_in_as(user)
#     get confirm_email_user_url('wrong token', email: user.email)
#     assert_not is_logged_in?
#     get confirm_email_user_url(user.confirm_token, email: 'wrong')
#     assert_not is_logged_in?
#     get confirm_email_user_url(user.confirm_token, email: user.email)
#     assert user.reload.email_confirmed?
#   end
# end
