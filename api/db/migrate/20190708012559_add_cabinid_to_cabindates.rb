# frozen_string_literal: true

# Add cabin id to dates
class AddCabinidToCabindates < ActiveRecord::Migration[5.2]
  def change
    add_column :cabindates, :cabin_id, :integer
  end
end
