# == Schema Information
#
# Table name: events
#
#  id          :bigint           not null, primary key
#  all_day     :boolean          default(TRUE)
#  description :string
#  end_time    :datetime
#  location    :string
#  start_time  :datetime
#  title       :string
#  user_id     :integer
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :event do
    sequence(:title) { |n| "Event #{n}" }
    description { "This is a test event description." }
    location { "Test Location" }
    start_time { Time.current + 1.day }
    end_time { Time.current + 1.day + 2.hours }
    association :user
  end
end
