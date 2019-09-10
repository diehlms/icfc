class AddUserIdToEvetns < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :user_id, :integer
    add_foreign_key :events, :users
  end
end
