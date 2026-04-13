# typed: strict
# frozen_string_literal: true

class JsonWebToken
  extend T::Sig

  sig { returns(String) }
  def self.secret_key
    T.must(Rails.application.secret_key_base).to_s
  end

  sig { params(payload: T::Hash[Symbol, T.untyped], exp: Integer).returns(String) }
  def self.encode(payload, exp = 24.hours.from_now.to_i)
    payload[:exp] = exp
    JWT.encode(payload, secret_key)
  end

  sig { params(token: String).returns(T.nilable(HashWithIndifferentAccess)) }
  def self.decode(token)
    body = JWT.decode(token, secret_key)[0]
    HashWithIndifferentAccess.new body
  rescue JWT::DecodeError => e
    nil
  end
end
