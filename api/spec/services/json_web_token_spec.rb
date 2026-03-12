require 'rails_helper'

RSpec.describe JsonWebToken do
  let(:payload) { { user_id: 42 } }
  let(:secret) { Rails.application.secrets.secret_key_base }

  describe '.encode' do
    it 'returns a string' do
      expect(JsonWebToken.encode(payload)).to be_a(String)
    end

    it 'encodes the payload into the token' do
      token = JsonWebToken.encode(payload)
      decoded = JWT.decode(token, secret, true, algorithm: 'HS256').first
      expect(decoded['user_id']).to eq(42)
    end

    it 'sets a default expiry 24 hours from now' do
      token = JsonWebToken.encode(payload)
      decoded = JWT.decode(token, secret, true, algorithm: 'HS256').first
      expect(decoded['exp']).to be_within(5).of(24.hours.from_now.to_i)
    end

    it 'accepts a custom expiry' do
      exp = 1.hour.from_now.to_i
      token = JsonWebToken.encode(payload, exp)
      decoded = JWT.decode(token, secret, true, algorithm: 'HS256').first
      expect(decoded['exp']).to eq(exp)
    end
  end

  describe '.decode' do
    it 'returns the payload for a valid token' do
      token = JsonWebToken.encode(payload)
      result = JsonWebToken.decode(token)
      expect(result).not_to be_nil
      expect(result[:user_id]).to eq(42)
    end

    it 'returns nil for an invalid token' do
      expect(JsonWebToken.decode('not.a.valid.token')).to be_nil
    end

    it 'returns nil for an expired token' do
      expired_token = JsonWebToken.encode(payload, 1.second.ago.to_i)
      expect(JsonWebToken.decode(expired_token)).to be_nil
    end
  end
end
