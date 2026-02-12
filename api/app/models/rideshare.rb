# frozen_string_literal: true

# == Schema Information
#
# Table name: rideshares
#
#  id                     :uuid             not null, primary key
#  additional_information :string
#  arriving_at            :datetime
#  departing_at           :datetime
#  number_of_passengers   :integer
#  seeking                :boolean          default(FALSE)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  point_of_arrival_id    :uuid
#  point_of_departure_id  :uuid
#  user_id                :string
#
# Foreign Keys
#
#  fk_rails_...  (point_of_arrival_id => location_points.id)
#  fk_rails_...  (point_of_departure_id => location_points.id)
#
# typed: true

class Rideshare < ApplicationRecord
  extend T::Sig

  belongs_to :user

  belongs_to :point_of_departure, class_name: 'LocationPoint', foreign_key: 'point_of_departure_id'
  belongs_to :point_of_arrival, class_name: 'LocationPoint', foreign_key: 'point_of_arrival_id'

  validates :number_of_passengers, presence: true, numericality: {
    only_integer: true
  }, inclusion: 1..7
  validates :departing_at, presence: true
  validates :arriving_at, presence: true
  validates :additional_information, presence: true, length: { maximum: 500 }
end
