require 'rails_helper'

RSpec.describe CampMessage, type: :model do
  it 'is valid with a message' do
    expect(build(:camp_message)).to be_valid
  end

  it 'defaults expired to false' do
    msg = create(:camp_message)
    expect(msg.expired).to be false
  end

  it 'can be marked as expired' do
    msg = create(:camp_message, expired: true)
    expect(msg.expired).to be true
  end
end
