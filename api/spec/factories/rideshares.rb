FactoryBot.define do
  factory :rideshare do
    departing_at { 2.days.from_now }
    arriving_at { 3.days.from_now }
    number_of_passengers { 2 }
    additional_information { "Happy to share the drive." }
    seeking { false }
    association :point_of_departure, factory: :location_point
    association :point_of_arrival, factory: :location_point

    after(:build) do |rideshare|
      rideshare.user_id ||= FactoryBot.create(:user).id.to_s
    end
  end
end
