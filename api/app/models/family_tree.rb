# frozen_string_literal: true

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
# typed: true

class FamilyTree < ApplicationRecord
  extend T::Sig

  has_many :family_members, dependent: :destroy

  belongs_to :user
  validates :user_id, presence: true
end
