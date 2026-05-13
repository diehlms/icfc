# frozen_string_literal: true

# Fix rubocop errors
class CreateGalleries < ActiveRecord::Migration[5.2]
  def change
    create_table :galleries do |t|
      t.string :image
      t.string :caption
      t.integer :user_id
      t.timestamps
    end
  end
end
