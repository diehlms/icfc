class AddUserIdToRideshares < ActiveRecord::Migration[5.2]
  def change
    add_column :rideshares, :user_id, :string
  end
end
