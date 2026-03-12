require 'rails_helper'

RSpec.describe Cabindate, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:startdate) }
    it { should validate_presence_of(:enddate) }
  end

  describe 'associations' do
    it { should belong_to(:cabin) }
  end

  describe '#end_time_after_start_time' do
    let(:cabin) { create(:cabin) }

    it 'is valid when enddate is after startdate' do
      cabindate = build(:cabindate, startdate: Date.today, enddate: Date.today + 3)
      expect(cabindate).to be_valid
    end

    it 'is invalid when enddate equals startdate' do
      cabindate = build(:cabindate, startdate: Date.today, enddate: Date.today)
      expect(cabindate).not_to be_valid
      expect(cabindate.errors[:enddate]).to include('must be after the start time')
    end

    it 'is invalid when enddate is before startdate' do
      cabindate = build(:cabindate, startdate: Date.today, enddate: Date.today - 1)
      expect(cabindate).not_to be_valid
      expect(cabindate.errors[:enddate]).to include('must be after the start time')
    end

    it 'skips the check when startdate is blank' do
      cabindate = build(:cabindate, startdate: nil, enddate: Date.today)
      cabindate.valid?
      expect(cabindate.errors[:enddate]).to be_empty
    end
  end
end
