# frozen_string_literal: true

class CabinAttachment < ApplicationRecord
  mount_uploader :image, ImageUploader
end
