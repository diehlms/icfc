# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :integer
#  user_id    :bigint
#
# Foreign Keys
#
#  fk_rails_...  (article_id => articles.id)
#  fk_rails_...  (user_id => users.id)
#
# typed: true

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
