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

class LocationPoint < ApplicationRecord
  extend T::Sig

  validates :location_name, presence: true, length: { maximum: 105 },
                            uniqueness: { case_sensitive: false }
end
