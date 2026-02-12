# typed: true
# frozen_string_literal: true

class Event < ApplicationRecord
  extend T::Sig

  belongs_to :user

  validates :title, presence: true, length: { maximum: 50 }
  validates :description, presence: true, length: { maximum: 10_000 }
  validates :location, presence: true, length: { minimum: 0, maximum: 100 }
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :user_id, presence: true

  validate :end_time_after_start_time

  private

  sig { void }
  def end_time_after_start_time
    return if end_time.blank? || start_time.blank?

    errors.add(:end_time, 'must be after the start time') unless end_time > start_time
  end
end
