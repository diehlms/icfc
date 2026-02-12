# frozen_string_literal: true

# Fix rubocop errors
class AddForeignKeyToGalleries < ActiveRecord::Migration[5.2]
  def change
    add_foreign_key :galleries, :users
  end
end
