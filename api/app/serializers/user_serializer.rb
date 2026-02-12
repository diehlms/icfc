# frozen_string_literal: true

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
# typed: true

class UserSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id,
             :email,
             :username,
             :email,
             :created_at,
             :updated_at,
             :email_id,
             :admin,
             :phone_number,
             :firstname,
             :lastname,
             :verified,
             :slug,
             :recently_joined?

  sig { returns(T::Boolean) }
  def recently_joined?
    Date.today.prev_month < object.created_at
  end
end
