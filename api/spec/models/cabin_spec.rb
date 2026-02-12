require 'rails_helper'

RSpec.describe Cabin, type: :model do
  describe 'validations' do
    subject { build(:cabin) }

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:bedrooms) }
    it { should validate_presence_of(:user_id) }
    it { should validate_length_of(:bedrooms).is_at_most(1) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:cabindates).dependent(:destroy) }
    it { should have_many(:cabin_attachments).dependent(:destroy) }
  end

  describe 'nested attributes' do
    it 'accepts nested attributes for cabin_attachments' do
      expect(Cabin._reflect_on_association(:cabin_attachments).options[:autosave]).to be_truthy
    end
  end

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:cabin)).to be_valid
    end
  end

  describe 'bedrooms validation' do
    it 'is valid with a single digit' do
      cabin = build(:cabin, bedrooms: '5')
      expect(cabin).to be_valid
    end

    it 'is invalid with multiple digits' do
      cabin = build(:cabin, bedrooms: '12')
      expect(cabin).not_to be_valid
      expect(cabin.errors[:bedrooms]).to include('is too long (maximum is 1 character)')
    end
  end
end