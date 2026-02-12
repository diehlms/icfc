# frozen_string_literal: true

# Fix rubocop errors
class CreateFamilyMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :family_members do |t|
      t.string :name
      t.integer :relationship
      t.date :date_of_birth
      t.references :family_tree, null: false, foreign_key: true
      t.references :parent, foreign_key: { to_table: :family_members }
      t.timestamps
    end
  end
end
