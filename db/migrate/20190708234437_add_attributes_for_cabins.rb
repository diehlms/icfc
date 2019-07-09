class AddAttributesForCabins < ActiveRecord::Migration[5.2]
  def change
    add_column :cabins, :washerdryer, :boolean, default: false
    add_column :cabins, :dock, :boolean, default: false
    add_column :cabins, :description, :string
  end
end
