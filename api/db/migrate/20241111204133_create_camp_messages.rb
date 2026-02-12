class CreateCampMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :camp_messages do |t|
      t.string :message
      t.boolean :expired

      t.timestamps
    end
  end
end
