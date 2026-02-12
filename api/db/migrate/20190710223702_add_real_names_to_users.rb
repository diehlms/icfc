# frozen_string_literal: true

# Fix rubocop errors
class AddRealNamesToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :firstname, :string
    add_column :users, :lastname, :string
  end
end
