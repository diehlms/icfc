class GallerySerializer < ActiveModel::Serializer
  attributes :id, :caption, :image, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
end
