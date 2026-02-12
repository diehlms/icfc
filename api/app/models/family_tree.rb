# typed: true
# frozen_string_literal: true

class FamilyTree < ApplicationRecord
  extend T::Sig

  has_many :family_members, dependent: :destroy

  belongs_to :user
  validates :user_id, presence: true
end
