# typed: strict
# frozen_string_literal: true

class JsonWebToken
  extend T::Sig

  SECRET_KEY = T.let(Rails.application.secrets.secret_key_base.to_s, String)

  sig { params(payload: T::Hash[Symbol, T.untyped], exp: Integer).returns(String) }
  def self.encode(payload, exp = 24.hours.from_now.to_i)
    payload[:exp] = exp
    JWT.encode(payload, SECRET_KEY)
  end

  sig { params(token: String).returns(T.nilable(HashWithIndifferentAccess)) }
  def self.decode(token)
    body = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new body
  rescue JWT::DecodeError => e
    nil
  end
end
