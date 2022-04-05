class CreatePointOfDepartures < ActiveRecord::Migration[5.2]
  def change
    create_table :point_of_departures, id: :uuid do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
