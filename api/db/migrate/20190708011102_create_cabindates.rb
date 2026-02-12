# frozen_string_literal: true

# Add cabin dates
class CreateCabindates < ActiveRecord::Migration[5.2]
  def change
    create_table :cabindates do |t|
      t.date :startdate
      t.date :enddate
    end
    remove_column :cabins, :available_start_date
    remove_column :cabins, :available_end_date
  end
end
