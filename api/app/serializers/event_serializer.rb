# typed: true
# frozen_string_literal: true

class EventSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :title,
             :location,
             :start_time,
             :end_time,
             :description,
             :id,
             :all_day

  belongs_to :user, serializer: UserSerializer
end
