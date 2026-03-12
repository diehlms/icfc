require 'rails_helper'

RSpec.describe FamilyMember, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:user_id) }
  end

  describe 'associations' do
    it { should belong_to(:family_tree) }
  end

  describe 'parent_ids length' do
    it 'is valid with two parent ids' do
      member = build(:family_member, parent_ids: [1, 2])
      member.valid?
      expect(member.errors[:parent_ids]).to be_empty
    end

    it 'is invalid with more than two parent ids' do
      member = build(:family_member, parent_ids: [1, 2, 3])
      expect(member).not_to be_valid
      expect(member.errors[:parent_ids]).to be_present
    end
  end

  describe 'relationship enum' do
    %i[father mother brother sister son daughter].each do |rel|
      it "accepts :#{rel}" do
        member = build(:family_member, relationship: rel)
        member.valid?
        expect(member.errors[:relationship]).to be_empty
      end
    end
  end
end
