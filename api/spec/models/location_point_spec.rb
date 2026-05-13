require 'rails_helper'

RSpec.describe LocationPoint, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:location_name) }
    it { should validate_length_of(:location_name).is_at_most(105) }

    it 'requires a unique location name (case insensitive)' do
      existing = create(:location_point)
      duplicate = build(:location_point, location_name: existing.location_name.upcase)
      expect(duplicate).not_to be_valid
      expect(duplicate.errors[:location_name]).to include('has already been taken')
    end
  end
end
