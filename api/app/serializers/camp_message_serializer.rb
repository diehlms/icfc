class CampMessageSerializer < ActiveModel::Serializer
  attributes :id, :message, :expired, :created_at, :updated_at
end
