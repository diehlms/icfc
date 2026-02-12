require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:valid_attributes) { { username: 'newuser', email: 'newuser@example.com', password: 'StrongPass123', firstname: 'Jane', lastname: 'Smith' } }
  let(:invalid_attributes) { { username: '', email: 'invalid-email' } }

  before do
    allow(controller).to receive(:authorize_request).and_return(true)
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET #index' do
    before do
      create_list(:user, 3)
    end

    it 'returns all users' do
      get :index
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_an(Array)
      expect(JSON.parse(response.body).length).to eq(4) # 3 created + 1 from let
    end
  end

  describe 'GET #show' do
    context 'when user exists' do
      it 'returns the user' do
        get :show, params: { id: user.id }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to include('id' => user.id)
      end
    end

    context 'when user does not exist' do
      it 'returns not found' do
        get :show, params: { id: 999999 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid parameters' do
      let(:update_attributes) { { firstname: 'Updated', lastname: 'Name' } }

      it 'updates the user' do
        put :update, params: { id: user.id, user: update_attributes }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['message']).to eq('User updated!')
        user.reload
        expect(user.firstname).to eq('Updated')
        expect(user.lastname).to eq('Name')
      end
    end

    context 'with invalid parameters' do
      it 'returns unprocessable entity' do
        put :update, params: { id: user.id, user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to have_key('errors')
      end
    end

    context 'when user does not exist' do
      it 'returns not found' do
        put :update, params: { id: 999999, user: valid_attributes }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when user exists' do
      it 'deletes the user' do
        delete :destroy, params: { id: user.id }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['message']).to eq('User deleted!')
        expect { User.find(user.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context 'when user does not exist' do
      it 'returns not found' do
        delete :destroy, params: { id: 999999 }
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe 'GET #confirm_email' do
    context 'with valid confirmation token' do
      let(:user_with_token) { create(:user, confirm_token: 'valid-token') }

      before do
        allow(User).to receive(:find_by_confirm_token).with('valid-token').and_return(user_with_token)
        allow(controller).to receive(:log_in).and_return(true)
      end

      it 'activates the user email' do
        get :confirm_email, params: { id: 'valid-token' }
        expect(response).to have_http_status(:ok)
        expect(user_with_token.email_confirmed).to be_truthy
        expect(user_with_token.confirm_token).to be_nil
      end
    end

    context 'with invalid confirmation token' do
      before do
        allow(User).to receive(:find_by_confirm_token).with('invalid-token').and_return(nil)
      end

      it 'does not activate any user' do
        get :confirm_email, params: { id: 'invalid-token' }
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'POST #toggle_verified' do
    let(:unverified_user) { create(:user, verified: false) }

    before do
      allow(UserMailer).to receive(:verified_confirmation).and_return(double(deliver: true))
    end

    it 'toggles the verified status' do
      post :toggle_verified, params: { id: unverified_user.id }
      expect(response).to have_http_status(:ok)
      unverified_user.reload
      expect(unverified_user.verified).to be_truthy
    end

    it 'sends verification confirmation email' do
      expect(UserMailer).to receive(:verified_confirmation).with(unverified_user).and_return(double(deliver: true))
      post :toggle_verified, params: { id: unverified_user.id }
    end
  end

  describe 'authorization' do
    context 'when user tries to update another user' do
      before do
        allow(controller).to receive(:check_authorization).and_raise(StandardError, 'Not authorized')
      end

      it 'raises authorization error' do
        expect {
          put :update, params: { id: other_user.id, user: valid_attributes }
        }.to raise_error(StandardError, 'Not authorized')
      end
    end

    context 'when user tries to delete another user' do
      before do
        allow(controller).to receive(:check_authorization).and_raise(StandardError, 'Not authorized')
      end

      it 'raises authorization error' do
        expect {
          delete :destroy, params: { id: other_user.id }
        }.to raise_error(StandardError, 'Not authorized')
      end
    end
  end
end