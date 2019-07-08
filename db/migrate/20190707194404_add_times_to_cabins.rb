class AddTimesToCabins < ActiveRecord::Migration[5.2]
  def change
    add_column :cabins, :available_start_date, :datetime
    add_column :cabins, :available_end_date, :datetime
  end
end
