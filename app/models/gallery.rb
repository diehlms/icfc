class Gallery < ApplicationRecord
    belongs_to :user
    
    validates :caption, presence: true, length: { maximum: 30}
    validates :user_id, presence: true
    
    mount_uploader :image, ImageUploader
    serialize :image, JSON
end
