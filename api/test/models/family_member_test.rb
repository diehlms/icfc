# == Schema Information
#
# Table name: family_members
#
#  id             :bigint           not null, primary key
#  date_of_birth  :date
#  name           :string
#  parent_ids     :bigint           default([]), is an Array
#  relationship   :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  family_tree_id :bigint           not null
#  user_id        :integer
#
# Indexes
#
#  index_family_members_on_family_tree_id  (family_tree_id)
#  index_family_members_on_parent_ids      (parent_ids) USING gin
#
# Foreign Keys
#
#  fk_rails_...  (family_tree_id => family_trees.id)
#
require 'test_helper'

class FamilyMemberTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
