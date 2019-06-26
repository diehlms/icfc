class UpdateCommentTableForGorails < ActiveRecord::Migration[5.2]
  def change
    remove_column :comments, :ancestry
    add_column :comments, :parent_id, :integer
    add_index :comments, :commentable_id
    add_index :comments, :commentable_type
  end
end
