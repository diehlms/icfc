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
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
