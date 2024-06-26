# frozen_string_literal: true

class FamilyTree < ApplicationRecord
  has_many :family_members, dependent: :destroy
end
