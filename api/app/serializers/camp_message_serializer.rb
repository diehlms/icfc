# typed: true
# frozen_string_literal: true

class CampMessageSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :message, :expired, :created_at, :updated_at
end
