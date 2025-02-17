# frozen_string_literal: true

# Add session table
class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions, &:timestamps
  end
end
