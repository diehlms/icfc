# frozen_string_literal: true

# Add locations table
class AddLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :location_points, id: :uuid do |t|
      t.string :location_name
      t.string :location_description

      t.timestamps
    end

    add_foreign_key :rideshares, :location_points, column: :point_of_arrival_id, primary_key: :id
    add_foreign_key :rideshares, :location_points, column: :point_of_departure_id, primary_key: :id
  end
end
