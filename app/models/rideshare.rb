class Rideshare < ApplicationRecord
    belongs_to :user

    validates :number_of_passengers, presence: true, numericality: { 
        only_integer: true,
    }, :inclusion => 1..7
    validates :departing_at, presence: true
    validates :arriving_at, presence: true
    validates :additional_information, presence: true, length: { maximum: 500 }
end
