# frozen_string_literal: true

class FamilyMember < ApplicationRecord
  belongs_to :family_tree
  belongs_to :parent, class_name: 'FamilyMember', optional: true
  has_many :children, class_name: 'FamilyMember', foreign_key: 'parent_id', dependent: :destroy

  enum relationship: {
    father: 0,
    mother: 1,
    brother: 2,
    sister: 3,
    son: 4,
    daughter: 5
  }
end
