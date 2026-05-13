# frozen_string_literal: true

# Fix rubocop errors
class AddImageToArticles < ActiveRecord::Migration[5.2]
  def change
    add_column :articles, :image, :string
  end
end
