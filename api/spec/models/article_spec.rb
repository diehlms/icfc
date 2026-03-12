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
    it { should accept_nested_attributes_for(:comments) }
  end

  describe 'friendly_id' do
    it 'uses title for slug' do
      article = create(:article, title: 'My Test Article')
      expect(article.slug).to eq('my-test-article')
    end

    it 'generates unique slugs for duplicate titles' do
      article1 = create(:article, title: 'Same Title')
      article2 = create(:article, title: 'Same Title')
      expect(article1.slug).not_to eq(article2.slug)
    end
  end

  describe 'filterable' do
    it 'includes Filterable' do
      expect(Article.included_modules).to include(Filterable)
    end
  end
end
