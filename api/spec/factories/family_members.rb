FactoryBot.define do
  factory :family_member do
    sequence(:name) { |n| "Family Member #{n}" }
    relationship { :father }
    date_of_birth { 40.years.ago }
    association :family_tree

    after(:build) do |member|
      member.user_id ||= FactoryBot.create(:user).id
    end
  end
end
