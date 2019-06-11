class RefactorStartDateEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :start_date
    remove_column :events, :end_date
    add_column :events, :start_time, :datetime
    add_column :events, :end_time, :datetime
  end
end
