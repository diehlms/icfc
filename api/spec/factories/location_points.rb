FactoryBot.define do
  factory :location_point do
    sequence(:location_name) { |n| "Location Point #{n}" }
    location_description { "A notable landmark." }
  end
end
