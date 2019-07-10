class CreateCabindate < ActiveRecord::Migration[5.2]
  def change
    create_table :cabindate do |t|
      t.date :startdate
      t.date :enddate
    end
    remove_column :cabins, :available_start_date
    remove_column :cabins, :available_end_date
  end
end
