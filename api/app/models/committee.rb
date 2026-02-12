# typed: true
# frozen_string_literal: true

class Committee < ApplicationRecord
  extend T::Sig

  validates :url, presence: true
end
