# typed: strict
# frozen_string_literal: true

class CaptchaService
  extend T::Sig

  VERIFY_URL = T.let('https://www.google.com/recaptcha/api/siteverify', String)

  sig { params(token: String).returns(T::Boolean) }
  def self.verify(token)
    return false if token.blank?

    uri = URI(VERIFY_URL)
    response = Net::HTTP.post_form(uri, 'secret' => ENV.fetch('RECAPTCHA_SECRET_KEY'), 'response' => token)
    JSON.parse(response.body).fetch('success', false)
  rescue StandardError
    false
  end
end
