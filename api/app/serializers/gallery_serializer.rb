# typed: true
# frozen_string_literal: true

class GallerySerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :caption, :image, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
end
