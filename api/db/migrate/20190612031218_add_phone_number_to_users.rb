# frozen_string_literal: true

# Add phone number to users
class AddPhoneNumberToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :phone_number, :string
  end
end
