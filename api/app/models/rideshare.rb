# frozen_string_literal: true

class Rideshare < ApplicationRecord
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
