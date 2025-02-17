class AddParentIdsToFamilyMembers < ActiveRecord::Migration[6.1]
  def change
    remove_column :family_members, :parent_id # Remove the old parent_id column
    add_column :family_members, :parent_ids, :bigint, array: true, default: [] # Add parent_ids as an array column
    add_index :family_members, :parent_ids, using: 'gin' # Index for array columns for efficient querying
  end
end
