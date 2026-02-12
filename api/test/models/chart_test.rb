# == Schema Information
#
# Table name: charts
#
#  id         :bigint           not null, primary key
#  caption    :string
#  chart      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
require 'test_helper'

class ChartTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
