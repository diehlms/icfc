class AddTypeToRideshares < ActiveRecord::Migration[5.2]
  def change
    add_column :rideshares, :seeking, :boolean
  end
end
