class Document < ApplicationRecord
    validates :document_title, length: { maximum: 30, minimum: 5 }, presence: true
    validates :document_folder, length: { maximum: 30, minimum: 5 }, presence: true
    validates :document, presence: true
    
    mount_uploader :document, DocumentUploader
    
end
