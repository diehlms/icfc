# typed: true
# frozen_string_literal: true

class CabinAttachment < ApplicationRecord
  extend T::Sig

  mount_uploader :image, ImageUploader
end
