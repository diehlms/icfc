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
require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'validations' do
    subject { build(:article) }

    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:content) }
    it { should validate_presence_of(:user_id) }
    it { should validate_length_of(:title).is_at_most(50) }
    it { should validate_length_of(:content).is_at_most(50_000) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:comments).dependent(:destroy) }
  end

  describe 'nested attributes' do
    it 'accepts nested attributes for comments' do
      expect(Article._reflect_on_association(:comments).options[:autosave]).to be_truthy
  end

  describe 'friendly_id' do
    it 'uses title for slug' do
      article = create(:article, title: 'My Test Article')
      expect(article.slug).to eq('my-test-article')
    end

    it 'generates unique slugs for articles with same title' do
      article1 = create(:article, title: 'Same Title')
      article2 = create(:article, title: 'Same Title')
      expect(article1.slug).not_to eq(article2.slug)
    end
  end

  describe 'pagination' do
    it 'sets per_page to 3' do
      expect(Article.per_page).to eq(3)
    end
  end

  describe 'file upload' do
    it 'mounts image uploader' do
      expect(Article.uploaders).to include(:image)
    end
  end

  describe 'filterable concern' do
    it 'includes Filterable concern' do
      expect(Article.included_modules).to include(Filterable)
    end
  end

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:article)).to be_valid
    end
  end

  describe 'title validation' do
    it 'is valid with title within limit' do
      article = build(:article, title: 'A' * 50)
      expect(article).to be_valid
    end

    it 'is invalid with title exceeding limit' do
      article = build(:article, title: 'A' * 51)
      expect(article).not_to be_valid
      expect(article.errors[:title]).to include('is too long (maximum is 50 characters)')
    end
  end

  describe 'content validation' do
    it 'is valid with content within limit' do
      article = build(:article, content: 'A' * 50_000)
      expect(article).to be_valid
    end

    it 'is invalid with content exceeding limit' do
      article = build(:article, content: 'A' * 50_001)
      expect(article).not_to be_valid
      expect(article.errors[:content]).to include('is too long (maximum is 50000 characters)')
    end
  end
end
