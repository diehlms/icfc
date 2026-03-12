FactoryBot.define do
  factory :family_tree do
    sequence(:name) { |n| "The Smith Family #{n}" }
    association :user
  end
end
