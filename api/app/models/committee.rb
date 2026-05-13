# typed: strict
# frozen_string_literal: true

# == Schema Information
#
# Table name: committees
#
#  id         :bigint           not null, primary key
#  name       :string
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Committee < ApplicationRecord
  extend T::Sig

  validates :url, presence: true
end
