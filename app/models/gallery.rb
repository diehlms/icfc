class Gallery < ApplicationRecord
    belongs_to :user
    
    mount_uploader :image, ImageUploader
    serialize :image, JSON
end
