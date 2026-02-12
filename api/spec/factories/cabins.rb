# == Schema Information
#
# Table name: cabins
#
#  id             :bigint           not null, primary key
#  bedrooms       :string
#  description    :string
#  dock           :boolean          default(FALSE)
#  name           :string
#  price_per_day  :integer
#  price_per_week :integer
#  washerdryer    :boolean          default(FALSE)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_id        :integer
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :cabin do
    sequence(:name) { |n| "Cabin #{n}" }
    bedrooms { "3" }
    association :user
  end
end
