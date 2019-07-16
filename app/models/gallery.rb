class Gallery < ApplicationRecord
    belongs_to :user
    
    validates :caption, presence: true, length: { maximum: 30}
    
    mount_uploader :image, ImageUploader
    serialize :image, JSON
end
