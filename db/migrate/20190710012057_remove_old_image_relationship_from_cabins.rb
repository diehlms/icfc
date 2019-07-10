class RemoveOldImageRelationshipFromCabins < ActiveRecord::Migration[5.2]
  def change
    remove_column :cabins, :images
  end
end
