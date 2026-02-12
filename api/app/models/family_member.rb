# frozen_string_literal: true

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
# typed: true

class FamilyMember < ApplicationRecord
  extend T::Sig

  belongs_to :family_tree
  belongs_to :family_tree
  belongs_to :parent, class_name: 'FamilyMember', optional: true

  validates :user_id, presence: true

  validates :parent_ids, length: { maximum: 2, message: 'A family member can have at most two parents' }

  enum relationship: {
    father: 0,
    mother: 1,
    brother: 2,
    sister: 3,
    son: 4,
    daughter: 5
  }
end
