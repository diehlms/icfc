# frozen_string_literal: true

# Fix rubocop errors
class AddRememberDigestToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :remember_digest, :string
  end
end
