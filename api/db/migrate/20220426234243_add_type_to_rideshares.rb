# frozen_string_literal: true

# Fix rubocop errors
class AddTypeToRideshares < ActiveRecord::Migration[5.2]
  def change
    add_column :rideshares, :seeking, :boolean, default: false
  end
end
