class EventSerializer < ActiveModel::Serializer
  attributes :events,
             :location,
             :start_time,
             :end_time,
             :description,
             :id

  belongs_to :user, serializer: UserSerializer
end
