# frozen_string_literal: true

# Add description
class AddDescriptionToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :description, :string
  end
end
