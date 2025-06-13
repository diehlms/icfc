class EventSerializer < ActiveModel::Serializer
  attributes :title,
             :location,
             :start_time,
             :end_time,
             :description,
             :id,
             :all_day

  belongs_to :user, serializer: UserSerializer
end
