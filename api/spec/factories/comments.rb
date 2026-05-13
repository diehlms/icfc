FactoryBot.define do
  factory :comment do
    content { "A thoughtful comment on this article." }
    association :user
    association :article
  end
end
