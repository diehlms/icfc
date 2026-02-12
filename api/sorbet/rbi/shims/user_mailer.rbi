# typed: true

# Shim for UserMailer action methods (Rails mailer methods are generated dynamically)
class UserMailer
  class << self
    sig { params(user: User).returns(ActionMailer::MessageDelivery) }
    def registration_confirmation(user); end

    sig { params(user: User).returns(ActionMailer::MessageDelivery) }
    def password_reset(user); end

    sig { params(user: User).returns(ActionMailer::MessageDelivery) }
    def verified_confirmation(user); end

    sig { params(user: User).returns(ActionMailer::MessageDelivery) }
    def new_member_notification(user); end
  end
end
