class AddRelationshipsToRideshares < ActiveRecord::Migration[5.2]
  def change
    add_reference :point_of_arrivals, :rideshare, foreign_key: true, type: :uuid
    add_reference :point_of_departures, :rideshare, foreign_key: true, type: :uuid
  end
end
