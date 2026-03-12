FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "username#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "StrongPass123" }
    password_confirmation { "StrongPass123" }
    firstname { "John" }
    lastname { "Doe" }
    phone_number { "555-123-4567" }
    email_confirmed { false }
    verified { false }

    trait :verified do
      email_confirmed { true }
      verified { true }
    end

    trait :admin do
      admin { true }
      email_confirmed { true }
      verified { true }
    end
  end

  # Keep for backward compatibility
  factory :verified_user, parent: :user do
    email_confirmed { true }
    verified { true }
  end
end
