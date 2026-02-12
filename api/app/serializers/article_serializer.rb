# typed: true
# frozen_string_literal: true

class ArticleSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :title, :content, :image, :pinned, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
  has_many :comments, dependent: :destroy, serializer: CommentSerializer
end
