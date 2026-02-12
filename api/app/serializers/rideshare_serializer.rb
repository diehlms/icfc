# typed: true
# frozen_string_literal: true

class RideshareSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :number_of_passengers, :additional_information, :arriving_at, :departing_at, :seeking, :updated_at,
             :created_at

  belongs_to :point_of_departure
  belongs_to :point_of_arrival
  belongs_to :user, serializer: UserSerializer
end
