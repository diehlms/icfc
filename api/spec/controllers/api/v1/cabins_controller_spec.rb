require 'rails_helper'

RSpec.describe Api::V1::CabinsController, type: :controller do
  let(:user) { create(:user) }
  let(:cabin) { create(:cabin, user: user) }
  let(:other_user) { create(:user) }
  let(:other_cabin) { create(:cabin, user: other_user) }
  let(:valid_attributes) { { name: 'Test Cabin', bedrooms: '2', user_id: user.id } }
  let(:invalid_attributes) { { name: '', bedrooms: '' } }

  before do
    allow(controller).to receive(:authorize_request).and_return(true)
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET #index' do
    before do
      create_list(:cabin, 3)
    end

    it 'returns all cabins' do
      get :index
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_an(Array)
      expect(JSON.parse(response.body).length).to eq(4) # 3 created + 1 from let
    end
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new cabin' do
        expect {
          post :create, params: { cabin: valid_attributes }
        }.to change(Cabin, :count).by(1)

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response['name']).to eq('Test Cabin')
        expect(json_response['bedrooms']).to eq('2')
      end
    end

    context 'with invalid parameters' do
      it 'does not create a cabin' do
        expect {
          post :create, params: { cabin: invalid_attributes }
        }.not_to change(Cabin, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end
  end

  describe 'GET #show' do
    context 'when cabin exists' do
      it 'returns the cabin' do
        get :show, params: { id: cabin.id }
        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response['id']).to eq(cabin.id)
        expect(json_response['name']).to eq(cabin.name)
      end
    end

    context 'when cabin does not exist' do
      it 'returns not found' do
        get :show, params: { id: 999999 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid parameters' do
      let(:update_attributes) { { name: 'Updated Cabin', bedrooms: '4' } }

      it 'updates the cabin' do
        put :update, params: { id: cabin.id, cabin: update_attributes }
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response['message']).to eq('Cabin updated!')
        
        cabin.reload
        expect(cabin.name).to eq('Updated Cabin')
        expect(cabin.bedrooms).to eq('4')
      end
    end

    context 'with invalid parameters' do
      it 'returns unprocessable entity' do
        put :update, params: { id: cabin.id, cabin: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end

    context 'when updating another user\'s cabin' do
      it 'returns unauthorized' do
        put :update, params: { id: other_cabin.id, cabin: valid_attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when cabin does not exist' do
      it 'returns not found' do
        put :update, params: { id: 999999, cabin: valid_attributes }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when cabin exists and user owns it' do
      it 'deletes the cabin' do
        expect {
          delete :destroy, params: { id: cabin.id }
        }.to change(Cabin, :count).by(-1)

        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when deleting another user\'s cabin' do
      it 'returns unauthorized' do
        delete :destroy, params: { id: other_cabin.id }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when cabin does not exist' do
      it 'returns not found' do
        delete :destroy, params: { id: 999999 }
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when deletion fails' do
      before do
        allow(cabin).to receive(:destroy).and_return(false)
        allow(cabin).to receive(:errors).and_return(['Error message'])
      end

      it 'returns unprocessable entity' do
        delete :destroy, params: { id: cabin.id }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'authorization' do
    context 'when user tries to update another user\'s cabin' do
      before do
        allow(controller).to receive(:check_authorization).and_raise(StandardError, 'Not authorized')
      end

      it 'raises authorization error' do
        expect {
          put :update, params: { id: other_cabin.id, cabin: valid_attributes }
        }.to raise_error(StandardError, 'Not authorized')
      end
    end

    context 'when user tries to delete another user\'s cabin' do
      before do
        allow(controller).to receive(:check_authorization).and_raise(StandardError, 'Not authorized')
      end

      it 'raises authorization error' do
        expect {
          delete :destroy, params: { id: other_cabin.id }
        }.to raise_error(StandardError, 'Not authorized')
      end
    end
  end

  describe 'parameter handling' do
    it 'permits correct parameters' do
      params = {
        cabin: {
          name: 'Test Cabin',
          bedrooms: '3',
          washerdryer: true,
          dock: false,
          user_id: user.id,
          price_per_week: 1000,
          price_per_day: 150,
          description: 'A beautiful cabin'
        }
      }

      post :create, params: params
      expect(response).to have_http_status(:ok)
    end
  end
end