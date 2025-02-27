# frozen_string_literal: true

# Add articles table
class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :content

      t.timestamps
    end
  end
end
