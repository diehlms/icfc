# frozen_string_literal: true

# Fix rubocop errors
class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string 'content'
      t.datetime 'created_at', null: false
      t.datetime 'updated_at', null: false
      t.bigint 'user_id'
      t.integer 'article_id'
    end
  end
end
