# typed: strict
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

class Comment < ApplicationRecord
  extend T::Sig

  belongs_to :user
  belongs_to :article

  self.per_page = 20

  validates :content, presence: true, allow_blank: false, length: { maximum: 1000 }
  validates :user_id, presence: true
end
