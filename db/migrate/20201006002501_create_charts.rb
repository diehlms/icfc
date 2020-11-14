class CreateCharts < ActiveRecord::Migration[5.2]
  def change
    create_table :charts do |t|
      t.string :chart
      t.string :caption
      t.integer :user_id
      t.timestamps
    end
  end
end
