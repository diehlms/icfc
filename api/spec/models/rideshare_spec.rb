require 'rails_helper'

RSpec.describe Rideshare, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:departing_at) }
    it { should validate_presence_of(:arriving_at) }
    it { should validate_presence_of(:additional_information) }
    it { should validate_length_of(:additional_information).is_at_most(500) }

    it 'requires number_of_passengers between 1 and 7' do
      expect(build(:rideshare, number_of_passengers: 0)).not_to be_valid
      expect(build(:rideshare, number_of_passengers: 1)).to be_valid
      expect(build(:rideshare, number_of_passengers: 7)).to be_valid
      expect(build(:rideshare, number_of_passengers: 8)).not_to be_valid
    end
  end

  describe 'associations' do
    it { should belong_to(:point_of_departure).class_name('LocationPoint') }
    it { should belong_to(:point_of_arrival).class_name('LocationPoint') }
  end
end
