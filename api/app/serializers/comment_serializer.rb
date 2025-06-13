class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at, :author_username, :author_email
  belongs_to :user, serializer: UserSerializer
  belongs_to :article, serializer: ArticleSerializer

  def author_username
    object.user.username
  end

  def author_email
    object.user.email
  end
end