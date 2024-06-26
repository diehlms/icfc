# frozen_string_literal: true

# Fix rubocop errors
class CreateFamilies < ActiveRecord::Migration[5.2]
  def change
    create_table :families do |t|
      t.string :familyname
      t.timestamps
    end
  end
end
