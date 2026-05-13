# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: charts
#
#  id         :bigint           not null, primary key
#  caption    :string
#  chart      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

class Chart < ApplicationRecord
  extend T::Sig

  self.per_page = 30

  belongs_to :user

  validates :caption, length: { maximum: 30 }
  validates :user_id, presence: true
  validates :chart, presence: true

  mount_uploader :chart, ChartUploader
end
