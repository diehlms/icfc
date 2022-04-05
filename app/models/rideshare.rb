class Rideshare < ApplicationRecord
    belongs_to :user
    has_one :point_of_arrivals
    has_one :point_of_departure

    validates :number_of_passengers, presence: true
    validates :departing_at, presence: true
    validates :arriving_at, presence: true
end
