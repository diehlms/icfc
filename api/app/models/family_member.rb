# frozen_string_literal: true

class FamilyMember < ApplicationRecord
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
