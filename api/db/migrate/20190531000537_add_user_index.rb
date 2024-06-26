# frozen_string_literal: true

# Add user index
class AddUserIndex < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :email, unique: true
  end
end
