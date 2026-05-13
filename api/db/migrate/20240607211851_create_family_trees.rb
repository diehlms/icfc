# frozen_string_literal: true

# Fix rubocop errors
class CreateFamilyTrees < ActiveRecord::Migration[6.1]
  def change
    create_table :family_trees do |t|
      t.string :name
      t.timestamps
    end
  end
end
