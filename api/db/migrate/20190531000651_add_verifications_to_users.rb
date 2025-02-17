# frozen_string_literal: true

# Add user verification
class AddVerificationsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :admin, :boolean, default: false
    add_column :users, :email_confirmed, :boolean, default: false
    add_column :users, :confirm_token, :string
  end
end
