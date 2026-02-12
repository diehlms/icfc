class ModifyEventsTable < ActiveRecord::Migration[6.1]
  def up
    change_column :events, :start_time, :datetime
    change_column :events, :end_time, :datetime
    rename_column :events, :events, :title
    add_column :events, :all_day, :boolean, default: true
  end

  def down
    remove_column :events, :all_day
    change_column :events, :start_time, :date
    change_column :events, :end_time, :date
    rename_column :events, :title, :events
  end
end