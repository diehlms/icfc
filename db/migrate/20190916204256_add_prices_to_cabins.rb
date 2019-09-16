class AddPricesToCabins < ActiveRecord::Migration[5.2]
  def change
    add_column :cabins, :price_per_week, :integer
    add_column :cabins, :price_per_day, :integer
  end
end
