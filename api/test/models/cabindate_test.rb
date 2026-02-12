# == Schema Information
#
# Table name: cabindates
#
#  id        :bigint           not null, primary key
#  enddate   :date
#  startdate :date
#  cabin_id  :integer
#
# Foreign Keys
#
#  fk_rails_...  (cabin_id => cabins.id)
#
require 'test_helper'

class CabindateTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
