# frozen_string_literal: true

# Fix rubocop errors
class AddSlugToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :slug, :string
    add_index :users, :slug, unique: true
  end
end
