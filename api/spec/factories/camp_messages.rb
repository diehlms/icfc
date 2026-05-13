FactoryBot.define do
  factory :camp_message do
    message { "Important announcement for camp." }
    expired { false }
  end
end
