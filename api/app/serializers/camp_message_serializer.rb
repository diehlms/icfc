# frozen_string_literal: true

# == Schema Information
#
# Table name: camp_messages
#
#  id         :bigint           not null, primary key
#  expired    :boolean
#  message    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# typed: true

class CampMessageSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :message, :expired, :created_at, :updated_at
end
