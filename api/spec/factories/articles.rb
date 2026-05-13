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
FactoryBot.define do
  factory :article do
    sequence(:title) { |n| "Article Title #{n}" }
    content { "This is the content of the article. It contains some text to make it valid." }
    association :user
  end
end
