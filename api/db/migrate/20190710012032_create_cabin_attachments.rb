# frozen_string_literal: true

# Fix rubocop errors
class CreateCabinAttachments < ActiveRecord::Migration[5.2]
  def change
    create_table :cabin_attachments do |t|
      t.integer :cabin_id
      t.string :image

      t.timestamps
    end
  end
end
