# frozen_string_literal: true

# == Schema Information
#
# Table name: articles
#
#  id         :bigint           not null, primary key
#  content    :string
#  image      :string
#  pinned     :boolean          default(FALSE)
#  slug       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Indexes
#
#  index_articles_on_slug  (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
# typed: true

class Article < ApplicationRecord
  extend T::Sig
  extend FriendlyId
  self.per_page = 3

  has_many :comments, dependent: :destroy
  belongs_to :user

  mount_uploader :image, ImageUploader

  include Filterable

  accepts_nested_attributes_for :comments

  validates :title, presence: true, length: { maximum: 50 }
  validates :content, presence: true, length: { maximum: 50_000 }
  validates :user_id, presence: true

  friendly_id :title, use: :slugged
end
