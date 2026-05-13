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

class FamilyTreeSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :name, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
  has_many :family_members, dependent: :destroy
end
