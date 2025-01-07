# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(firstname: 'foobar', lastname: 'foobar', username: 'foobar', email: 'user@example.com',
                     email_confirmed: true, verified: true, password: 'Blahblah1', password_confirmation: 'Blahblah1')
  end

  test 'should be verified' do
    assert @user.verified?
  end

  test 'authenticated should return false for user with nil digest' do
    assert_not @user.authenticated?('')
  end

  test 'name should be present' do
    @user.username = '     '
    assert_not @user.valid?
  end

  test 'email addresses should be unique' do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

  test 'email addresses should be saved as lower-case' do
    mixed_case_email = 'Foo@ExAMPle.CoM'
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end
end
