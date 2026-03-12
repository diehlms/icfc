FactoryBot.define do
  factory :cabindate do
    startdate { Date.today + 7 }
    enddate { Date.today + 14 }
    association :cabin
  end
end
