class Event < ApplicationRecord
    belongs_to :user

    validates :events, presence: true, length: { maximum: 50}
    validates :description, presence: true, length: { maximum: 10000}
    validates :location, presence: true, length: {minimum: 0, maximum: 100}
    validates :start_time, presence: true
    
end
