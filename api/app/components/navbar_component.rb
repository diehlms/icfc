# typed: true
# frozen_string_literal: true

class NavbarComponent < ViewComponent::Base
  extend T::Sig

  sig { params(current_user: T.nilable(User)).void }
  def initialize(current_user:)
    super()
    @current_user = current_user
  end

  sig { returns(String) }
  def user_initials
    first = @current_user&.firstname&.first || ''
    last  = @current_user&.lastname&.first || ''
    "#{first}#{last}".upcase
  end
end
