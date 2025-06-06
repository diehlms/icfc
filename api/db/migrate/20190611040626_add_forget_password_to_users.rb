# frozen_string_literal: true

# Add forget password token to users
class AddForgetPasswordToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :password_reset_token, :string
    add_column :users, :password_reset_sent_at, :datetime
  end
end
