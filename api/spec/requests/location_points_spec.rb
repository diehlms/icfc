require 'rails_helper'

RSpec.describe 'LocationPoints', type: :request do
  let(:user) { create(:user, :verified) }

  describe 'GET /location_points/new' do
    it 'redirects to login when not authenticated' do
      get new_location_point_path
      expect(response).to redirect_to(login_path)
    end

    it 'renders the new form when authenticated' do
      web_login(user)
      get new_location_point_path
      expect(response).to be_successful
    end
  end

  describe 'POST /location_points' do
    context 'when not logged in' do
      it 'redirects to login' do
        post location_points_path, params: { location_point: { location_name: 'Dock A' } }
        expect(response).to redirect_to(login_path)
      end
    end

    context 'when logged in' do
      before { web_login(user) }

      it 'creates a location point' do
        expect {
          post location_points_path,
               params: { location_point: { location_name: 'Dock A' } },
               headers: { 'Accept' => 'text/vnd.turbo-stream.html' }
        }.to change(LocationPoint, :count).by(1)
      end

      it 'does not create a duplicate location' do
        create(:location_point, location_name: 'Dock A')
        expect {
          post location_points_path,
               params: { location_point: { location_name: 'Dock A' } },
               headers: { 'Accept' => 'text/vnd.turbo-stream.html' }
        }.not_to change(LocationPoint, :count)
      end

      it 'does not create a location with a blank name' do
        expect {
          post location_points_path,
               params: { location_point: { location_name: '' } },
               headers: { 'Accept' => 'text/vnd.turbo-stream.html' }
        }.not_to change(LocationPoint, :count)
      end
    end
  end
end
