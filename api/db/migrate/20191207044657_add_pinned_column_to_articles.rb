# frozen_string_literal: true

# Fix rubocop errors
class AddPinnedColumnToArticles < ActiveRecord::Migration[5.2]
  def change
    add_column :articles, :pinned, :boolean, default: false
  end
end
