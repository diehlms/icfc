# frozen_string_literal: true

# == Schema Information
#
# Table name: location_points
#
#  id                   :uuid             not null, primary key
#  location_description :string
#  location_name        :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
# typed: true

class LocationPointSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :location_name, :location_description
end
