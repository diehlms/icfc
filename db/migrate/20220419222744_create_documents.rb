class CreateDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :documents, id: :uuid do |t|
      t.string :document_title
      t.string :document_folder
      t.string :document
      t.timestamps
    end
  end
end
