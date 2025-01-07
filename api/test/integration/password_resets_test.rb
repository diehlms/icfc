# # frozen_string_literal: true

# require 'test_helper'

# class PasswordResetsTest < ActionDispatch::IntegrationTest
#   def setup
#     ActionMailer::Base.deliveries.clear
#     @user = users(:diehl)
#   end

#   test 'password resets' do
#     get new_password_reset_path
#     post password_resets_path, params: { email: '' }
#     assert_not flash.empty?
#     get new_password_reset_path
#     post password_resets_path, params: { email: @user.email }
#     assert_not_equal @user.password_reset_token, @user.reload.password_reset_token
#     assert_equal 1, ActionMailer::Base.deliveries.size
#     assert_redirected_to root_url
#     # get edit_password_reset_path(@user.password_reset_token, email: "")
#     # assert_response(200)
#     # @user.toggle!(:email_confirmed)
#     # get edit_password_reset_path("wrong token", id: @user.id)
#     # assert_response(200)
#     # @user.toggle!(:email_confirmed)
#     # get edit_password_reset_path(@user.password_reset_token, id: @user.id)
#     # assert_template "password_resets/edit"
#     # assert_select "input[name=email][type=hidden][value=?]", user.email
#     # patch password_reset_path(@user.password_reset_token), params: { email: @user.email, user: {
#     #  password: "foobar", password_confirmation: "barquux" }}
#     # assert_select "div#error_explanation"
#     # patch password_reset_path(@user.password_reset_token), params: { email: @user.email, user: { password: "",
#     # password_confirmation: "" }}
#     # assert_select "div#error_explanation"
#     # patch password_reset_path(@user.password_reset_token), params: { email: @user.email, user: { password: "foobar",
#     # password_confirmation: "foobar" }}
#     # assert is_logged_in?
#   end
# end
