# typed: true
# frozen_string_literal: true

class FlashComponent < ViewComponent::Base
  extend T::Sig

  sig { params(flash: ActionDispatch::Flash::FlashHash).void }
  def initialize(flash:)
    super()
    @flash = flash
  end

  sig { params(type: String).returns(String) }
  def css_for(type)
    case type
    when 'notice' then 'bg-green-100 text-green-800 border-green-300'
    when 'alert'  then 'bg-red-100 text-red-800 border-red-300'
    else               'bg-blue-100 text-blue-800 border-blue-300'
    end
  end
end
