class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :image, :pinned
  belongs_to :user, serializer: UserSerializer
  has_many :comments, dependent: :destroy
end
