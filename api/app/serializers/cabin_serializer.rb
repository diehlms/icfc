# frozen_string_literal: true

# == Schema Information
#
# Table name: cabins
#
#  id             :bigint           not null, primary key
#  bedrooms       :string
#  description    :string
#  dock           :boolean          default(FALSE)
#  name           :string
#  price_per_day  :integer
#  price_per_week :integer
#  washerdryer    :boolean          default(FALSE)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_id        :integer
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
# typed: true

class CabinSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :name, :bedrooms, :created_at, :updated_at, :dock, :washerdryer, :description, :price_per_week,
             :price_per_day
  belongs_to :user, serializer: UserSerializer
  has_many :cabindates, dependent: :destroy
  has_many :cabin_attachments, dependent: :destroy
end
