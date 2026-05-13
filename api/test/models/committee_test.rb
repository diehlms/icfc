# == Schema Information
#
# Table name: committees
#
#  id         :bigint           not null, primary key
#  name       :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class CommitteeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
