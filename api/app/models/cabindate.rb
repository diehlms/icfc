# frozen_string_literal: true

# == Schema Information
#
# Table name: cabindates
#
#  id        :bigint           not null, primary key
#  enddate   :date
#  startdate :date
#  cabin_id  :integer
#
# Foreign Keys
#
#  fk_rails_...  (cabin_id => cabins.id)
#
# typed: true

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
