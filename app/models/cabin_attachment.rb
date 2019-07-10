class CabinAttachment < ApplicationRecord
    mount_uploader :image, ImageUploader
end
