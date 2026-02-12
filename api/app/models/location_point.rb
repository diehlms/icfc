# typed: true
# frozen_string_literal: true

class LocationPoint < ApplicationRecord
  extend T::Sig

  validates :location_name, presence: true, length: { maximum: 105 },
                            uniqueness: { case_sensitive: false }
end
