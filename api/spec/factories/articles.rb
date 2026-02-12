FactoryBot.define do
  factory :article do
    sequence(:title) { |n| "Article Title #{n}" }
    content { "This is the content of the article. It contains some text to make it valid." }
    association :user
  end
end