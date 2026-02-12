# frozen_string_literal: true

# == Schema Information
#
# Table name: galleries
#
#  id         :bigint           not null, primary key
#  caption    :string
#  image      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
# typed: true

class GallerySerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :caption, :image, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
end
