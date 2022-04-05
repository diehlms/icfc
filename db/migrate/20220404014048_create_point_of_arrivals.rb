class CreatePointOfArrivals < ActiveRecord::Migration[5.2]
  def change
    create_table :point_of_arrivals, id: :uuid do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
