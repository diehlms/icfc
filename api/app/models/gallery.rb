# frozen_string_literal: true

class Gallery < ApplicationRecord
  self.per_page = 30

  belongs_to :user

  validates :caption, length: { maximum: 30 }
  validates :user_id, presence: true

  mount_uploader :image, ImageUploader
end
