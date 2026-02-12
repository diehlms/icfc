FactoryBot.define do
  factory :cabin do
    sequence(:name) { |n| "Cabin #{n}" }
    bedrooms { "3" }
    association :user
  end
end