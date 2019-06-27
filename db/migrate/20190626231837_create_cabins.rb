class CreateCabins < ActiveRecord::Migration[5.2]
  def change
    create_table :cabins do |t|
      t.string :name
      t.string :bedrooms
      t.string :image

      t.timestamps
    end
  end
end
