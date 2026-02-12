# typed: true

# Shim for ActionMailer::MessageDelivery#deliver
class ActionMailer::MessageDelivery
  sig { returns(T.untyped) }
  def deliver; end
end
