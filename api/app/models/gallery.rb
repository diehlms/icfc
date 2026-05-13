# typed: strict
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

class Gallery < ApplicationRecord
  extend T::Sig

  self.per_page = 30

  validates :image, presence: true

  belongs_to :user
  validates :user_id, presence: true

  mount_uploader :image, ImageUploader
end
