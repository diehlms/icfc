# typed: true
# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :content, :created_at, :updated_at, :author_username, :author_email
  belongs_to :user, serializer: UserSerializer
  belongs_to :article, serializer: ArticleSerializer

  sig { returns(String) }
  def author_username
    object.user.username
  end

  sig { returns(String) }
  def author_email
    object.user.email
  end
end
