class AddUserIdToCabins < ActiveRecord::Migration[5.2]
  def change
    add_column :cabins, :user_id, :integer
  end
end
