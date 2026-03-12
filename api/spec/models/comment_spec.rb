require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'validations' do
    subject { build(:comment) }

    it { should validate_presence_of(:content) }
    it { should validate_presence_of(:user_id) }
    it { should validate_length_of(:content).is_at_most(1000) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:article) }
  end

  it 'is invalid with blank content' do
    comment = build(:comment, content: '')
    expect(comment).not_to be_valid
  end
end
