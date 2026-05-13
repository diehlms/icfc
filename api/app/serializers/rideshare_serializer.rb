# frozen_string_literal: true

# == Schema Information
#
# Table name: rideshares
#
#  id                     :uuid             not null, primary key
#  additional_information :string
#  arriving_at            :datetime
#  departing_at           :datetime
#  number_of_passengers   :integer
#  seeking                :boolean          default(FALSE)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  point_of_arrival_id    :uuid
#  point_of_departure_id  :uuid
#  user_id                :string
#
# Foreign Keys
#
#  fk_rails_...  (point_of_arrival_id => location_points.id)
#  fk_rails_...  (point_of_departure_id => location_points.id)
#
# typed: true

class RideshareSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :number_of_passengers, :additional_information, :arriving_at, :departing_at, :seeking, :updated_at,
             :created_at

  belongs_to :point_of_departure
  belongs_to :point_of_arrival
  belongs_to :user, serializer: UserSerializer
end
