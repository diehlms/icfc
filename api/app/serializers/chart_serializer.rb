# typed: true
# frozen_string_literal: true

class ChartSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :chart, :caption, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
end
