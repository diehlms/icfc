# typed: true
# frozen_string_literal: true

class SidebarComponent < ViewComponent::Base
  extend T::Sig

  sig { params(current_user: T.nilable(User)).void }
  def initialize(current_user:)
    super()
    @current_user = current_user
  end
end
