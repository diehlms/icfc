class FixCommentsTable < ActiveRecord::Migration[5.2]
  def change
    add_reference :comments, :user, foreign_key: true
    add_column :comments, :article_id, :integer
    remove_column :comments, :commentable_type
    remove_column :comments, :commentable_id
    remove_column :comments, :parent_id
  end
end
