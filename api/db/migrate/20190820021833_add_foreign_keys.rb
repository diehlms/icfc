# frozen_string_literal: true

# Fix rubocop errors
class AddForeignKeys < ActiveRecord::Migration[5.2]
  def change
    add_foreign_key :articles, :users
    add_foreign_key :comments, :users
    add_foreign_key :cabins, :users
    add_foreign_key :cabindates, :cabins
    add_foreign_key :cabin_attachments, :cabins
  end
end
