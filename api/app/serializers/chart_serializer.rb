class ChartSerializer < ActiveModel::Serializer
  attributes :id, :chart, :caption, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
end
