# frozen_string_literal: true

# Fix rubocop errors
class AddSlugToRooms < ActiveRecord::Migration[5.2]
  def change
    add_column :rooms, :slug, :string
    add_index :rooms, :slug, unique: true
  end
end
