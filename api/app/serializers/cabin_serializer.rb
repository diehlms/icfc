# typed: true
# frozen_string_literal: true

class CabinSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :name, :bedrooms, :created_at, :updated_at, :dock, :washerdryer, :description, :price_per_week,
             :price_per_day
  belongs_to :user, serializer: UserSerializer
  has_many :cabindates, dependent: :destroy
  has_many :cabin_attachments, dependent: :destroy
end
