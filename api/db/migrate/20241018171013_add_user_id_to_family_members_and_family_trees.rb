class AddUserIdToFamilyMembersAndFamilyTrees < ActiveRecord::Migration[6.1]
  def change
    add_column :family_trees, :user_id, :integer
    add_column :family_members, :user_id, :integer
  end
end
