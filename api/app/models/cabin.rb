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

class Cabin < ApplicationRecord
  extend T::Sig

  validates :name, presence: true
  validates :bedrooms, presence: true, length: { maximum: 1 }
  has_many :cabindates, dependent: :destroy
  belongs_to :user
  has_many :cabin_attachments, dependent: :destroy
  accepts_nested_attributes_for :cabin_attachments
  validates :user_id, presence: true
end
