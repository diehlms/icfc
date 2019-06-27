class Cabin < ApplicationRecord
    validates :name, presence: true
    validates :bedrooms, presence: true

    mount_uploader :image, ImageUploader
    serialize :image, JSON
end
