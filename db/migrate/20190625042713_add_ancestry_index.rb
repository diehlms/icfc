class AddAncestryIndex < ActiveRecord::Migration[5.2]
  def change
    add_index :comments, :ancestry
  end
end
