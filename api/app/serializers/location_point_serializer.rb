# typed: true
# frozen_string_literal: true

class LocationPointSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :location_name, :location_description
end
