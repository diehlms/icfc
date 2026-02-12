# typed: true
# frozen_string_literal: true

class Cabindate < ApplicationRecord
  extend T::Sig

  belongs_to :cabin
  validates :startdate, presence: true
  validates :enddate, presence: true

  validate :end_time_after_start_time

  private

  sig { void }
  def end_time_after_start_time
    return if startdate.blank? || enddate.blank?

    if enddate <= startdate
      errors.add(:enddate, 'must be after the start time')
    end
  end
end
