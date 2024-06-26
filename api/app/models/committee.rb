# frozen_string_literal: true

class Committee < ApplicationRecord
  validates :url, presence: true
end
