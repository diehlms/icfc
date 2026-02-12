# == Schema Information
#
# Table name: camp_messages
#
#  id         :bigint           not null, primary key
#  expired    :boolean
#  message    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class CampMessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
