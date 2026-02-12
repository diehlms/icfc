# typed: true
# frozen_string_literal: true

class FamilyTreeSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :name, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
  has_many :family_members, dependent: :destroy
end
