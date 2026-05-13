require 'rails_helper'

RSpec.describe FamilyTree, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:user_id) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should have_many(:family_members).dependent(:destroy) }
  end

  it 'is valid with a name and user' do
    user = create(:user)
    expect(build(:family_tree, user: user)).to be_valid
  end
end
