# frozen_string_literal: true

# Add user id to articles
class AddUserIdToArticles < ActiveRecord::Migration[5.2]
  def change
    add_column :articles, :user_id, :integer
  end
end
