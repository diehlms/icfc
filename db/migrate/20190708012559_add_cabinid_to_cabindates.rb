class AddCabinidTocabindate < ActiveRecord::Migration[5.2]
  def change
    add_column :cabindate, :cabin_id, :integer
  end
end
