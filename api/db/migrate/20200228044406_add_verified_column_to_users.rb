# frozen_string_literal: true

# Fix rubocop errors
class AddVerifiedColumnToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :verified, :boolean, default: false
  end
end
