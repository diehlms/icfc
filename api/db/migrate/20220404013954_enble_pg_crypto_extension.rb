# frozen_string_literal: true

# Fix rubocop errors
class EnblePgCryptoExtension < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'pgcrypto'
  end
end
