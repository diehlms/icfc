require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test "account_activation" do
    user = users(:diehl)
    user.confirm_token = User.new_token
    mail = UserMailer.registration_confirmation(user)
    assert_equal "Registration Confirmation", mail.subject
    assert_equal [user.email], mail.to
    assert_equal ["diehlstx@gmail.com"], mail.from
    assert_match user.username,               mail.body.encoded
    assert_match user.confirm_token,   mail.body.encoded
  end

  test "password_reset" do
    user = users(:diehl)
    user.password_reset_token = User.new_token
    mail = UserMailer.password_reset(user)
    assert_equal "Password Reset", mail.subject
    assert_equal [user.email], mail.to
    assert_equal ["diehlstx@gmail.com"], mail.from
    assert_match user.password_reset_token,        mail.body.encoded
  end

end
