# frozen_string_literal: true

# Add events table
class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :events
      t.datetime :start_time
      t.datetime :end_time
    end
  end
end
