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
require 'test_helper'

class LocationPointTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
