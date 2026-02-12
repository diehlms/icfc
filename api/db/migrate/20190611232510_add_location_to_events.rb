# frozen_string_literal: true

# Add location to events
class AddLocationToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :location, :string
  end
end
