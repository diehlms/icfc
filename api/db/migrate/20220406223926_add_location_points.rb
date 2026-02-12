# frozen_string_literal: true

# Fix rubocop errors
class AddLocationPoints < ActiveRecord::Migration[5.2]
  def change
    add_column :rideshares, :point_of_arrival_id, :uuid
    add_column :rideshares, :point_of_departure_id, :uuid
  end
end
