require 'rails_helper'

RSpec.describe Committee, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:url) }
  end

  it 'is valid with a name and url' do
    expect(build(:committee)).to be_valid
  end
end
