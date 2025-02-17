# frozen_string_literal: true

# Fix rubocop errors
class RemoveOldImageRelationshipFromCabins < ActiveRecord::Migration[5.2]
  def change
    remove_column :cabins, :images
  end
end
