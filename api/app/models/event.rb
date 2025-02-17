# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :user

  validates :events, presence: true, length: { maximum: 50 }
  validates :description, presence: true, length: { maximum: 10_000 }
  validates :location, presence: true, length: { minimum: 0, maximum: 100 }
  validates :start_time, presence: true

  validates :user_id, presence: true
end
