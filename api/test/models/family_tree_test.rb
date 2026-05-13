# == Schema Information
#
# Table name: family_trees
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
require 'test_helper'

class FamilyTreeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
