FactoryBot.define do
  factory :committee do
    sequence(:name) { |n| "Committee #{n}" }
    url { "https://example.com/committee" }
  end
end
