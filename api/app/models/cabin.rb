# frozen_string_literal: true

class Cabin < ApplicationRecord
  validates :name, presence: true
  validates :bedrooms, presence: true, length: { maximum: 1 }
  has_many :cabindates, dependent: :destroy
  belongs_to :user
  has_many :cabin_attachments, dependent: :destroy
  accepts_nested_attributes_for :cabin_attachments
  validates :user_id, presence: true
end
