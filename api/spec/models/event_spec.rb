require 'rails_helper'

RSpec.describe Event, type: :model do
  describe 'validations' do
    subject { build(:event) }

    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:location) }
    it { should validate_presence_of(:start_time) }
    it { should validate_presence_of(:end_time) }
    it { should validate_presence_of(:user_id) }
    it { should validate_length_of(:title).is_at_most(50) }
    it { should validate_length_of(:description).is_at_most(10_000) }
    it { should validate_length_of(:location).is_at_most(100) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe '#end_time_after_start_time' do
    let(:user) { create(:user) }
    let(:base) { Time.current }

    it 'is valid when end_time is after start_time' do
      expect(build(:event, user: user, start_time: base, end_time: base + 1.hour)).to be_valid
    end

    it 'is invalid when end_time equals start_time' do
      event = build(:event, user: user, start_time: base, end_time: base)
      expect(event).not_to be_valid
      expect(event.errors[:end_time]).to include('must be after the start time')
    end

    it 'is invalid when end_time is before start_time' do
      event = build(:event, user: user, start_time: base, end_time: base - 1.hour)
      expect(event).not_to be_valid
      expect(event.errors[:end_time]).to include('must be after the start time')
    end

    it 'skips the check when start_time is blank' do
      event = build(:event, user: user, start_time: nil, end_time: base)
      event.valid?
      expect(event.errors[:end_time]).to be_empty
    end

    it 'skips the check when end_time is blank' do
      event = build(:event, user: user, start_time: base, end_time: nil)
      event.valid?
      expect(event.errors[:end_time]).to be_empty
    end
  end
end
