# frozen_string_literal: true

# == Schema Information
#
# Table name: articles
#
#  id         :bigint           not null, primary key
#  content    :string
#  image      :string
#  pinned     :boolean          default(FALSE)
#  slug       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Indexes
#
#  index_articles_on_slug  (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
# typed: true

class ArticleSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :title, :content, :image, :pinned, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
  has_many :comments, dependent: :destroy, serializer: CommentSerializer
end
