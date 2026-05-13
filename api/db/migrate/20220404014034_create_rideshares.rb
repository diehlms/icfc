# frozen_string_literal: true

# Fix rubocop errors
class CreateRideshares < ActiveRecord::Migration[5.2]
  def change
    create_table :rideshares, id: :uuid do |t|
      t.datetime :departing_at
      t.datetime :arriving_at
      t.integer :number_of_passengers
      t.string :additional_information

      t.timestamps
    end
  end
end
