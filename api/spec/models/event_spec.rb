# == Schema Information
#
# Table name: events
#
#  id          :bigint           not null, primary key
#  all_day     :boolean          default(TRUE)
#  description :string
#  end_time    :datetime
#  location    :string
#  start_time  :datetime
#  title       :string
#  user_id     :integer
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
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

  describe 'custom validation' do
    describe '#end_time_after_start_time' do
      let(:start_time) { Time.current }
      let(:end_time) { start_time + 1.hour }

      context 'when end_time is after start_time' do
        it 'is valid' do
          event = build(:event, start_time: start_time, end_time: end_time)
          expect(event).to be_valid
        end
      end

      context 'when end_time is before start_time' do
        it 'is invalid' do
          event = build(:event, start_time: start_time, end_time: start_time - 1.hour)
          expect(event).not_to be_valid
          expect(event.errors[:end_time]).to include('must be after the start time')
        end
      end

      context 'when end_time equals start_time' do
        it 'is invalid' do
          event = build(:event, start_time: start_time, end_time: start_time)
          expect(event).not_to be_valid
          expect(event.errors[:end_time]).to include('must be after the start time')
        end
      end

      context 'when start_time is blank' do
        it 'skips validation' do
          event = build(:event, start_time: nil, end_time: end_time)
          expect(event).not_to be_valid
          expect(event.errors[:end_time]).to be_empty
        end
      end

      context 'when end_time is blank' do
        it 'skips validation' do
          event = build(:event, start_time: start_time, end_time: nil)
          expect(event).not_to be_valid
          expect(event.errors[:end_time]).to be_empty
        end
      end
    end
  end

  describe 'factory' do
    it 'has a valid factory' do
      expect(build(:event)).to be_valid
    end
  end

  describe 'title validation' do
    it 'is valid with title within limit' do
      event = build(:event, title: 'A' * 50)
      expect(event).to be_valid
    end

    it 'is invalid with title exceeding limit' do
      event = build(:event, title: 'A' * 51)
      expect(event).not_to be_valid
      expect(event.errors[:title]).to include('is too long (maximum is 50 characters)')
    end
  end

  describe 'description validation' do
    it 'is valid with description within limit' do
      event = build(:event, description: 'A' * 10_000)
      expect(event).to be_valid
    end

    it 'is invalid with description exceeding limit' do
      event = build(:event, description: 'A' * 10_001)
      expect(event).not_to be_valid
      expect(event.errors[:description]).to include('is too long (maximum is 10000 characters)')
    end
  end

  describe 'location validation' do
    it 'is valid with location within limit' do
      event = build(:event, location: 'A' * 100)
      expect(event).to be_valid
    end

    it 'is invalid with location exceeding limit' do
      event = build(:event, location: 'A' * 101)
      expect(event).not_to be_valid
      expect(event.errors[:location]).to include('is too long (maximum is 100 characters)')
    end

    it 'is valid with empty location' do
      event = build(:event, location: '')
      expect(event).to be_valid
    end
  end
end
