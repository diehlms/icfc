# frozen_string_literal: true

# Fix rubocop errors
class AddForeignKeysToComments < ActiveRecord::Migration[5.2]
  def change
    add_foreign_key :comments, :articles
  end
end
