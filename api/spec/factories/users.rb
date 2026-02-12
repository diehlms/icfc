# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  admin                  :boolean          default(FALSE)
#  confirm_token          :string
#  email                  :string
#  email_confirmed        :boolean          default(FALSE)
#  firstname              :string
#  lastname               :string
#  password_digest        :string
#  password_reset_sent_at :datetime
#  password_reset_token   :string
#  phone_number           :string
#  remember_digest        :string
#  slug                   :string
#  username               :string
#  verified               :boolean          default(FALSE)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  email_id               :bigint
#
# Indexes
#
#  index_users_on_email_id  (email_id)
#  index_users_on_slug      (slug) UNIQUE
#
FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "user#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "StrongPass123" }
    password_confirmation { "StrongPass123" }
    firstname { "John" }
    lastname { "Doe" }
    phone_number { "555-123-4567" }
    email_confirmed { false }
    verified { false }
  end

  factory :verified_user, parent: :user do
    email_confirmed { true }
    verified { true }
  end
end
