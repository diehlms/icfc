# frozen_string_literal: true

# Change datetime to date in events
class ChangeDatetimeToDate < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :start_time
    remove_column :events, :end_time
    add_column :events, :start_time, :date
    add_column :events, :end_time, :date
  end
end
