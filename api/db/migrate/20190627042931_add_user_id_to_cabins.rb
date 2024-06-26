# frozen_string_literal: true

# Add user id to cabins
class AddUserIdToCabins < ActiveRecord::Migration[5.2]
  def change
    add_column :cabins, :user_id, :integer
  end
end
