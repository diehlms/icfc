# typed: true
# frozen_string_literal: true

class Gallery < ApplicationRecord
  extend T::Sig

  self.per_page = 30

  validates :image, presence: true

  belongs_to :user
  validates :user_id, presence: true

  mount_uploader :image, ImageUploader
end
