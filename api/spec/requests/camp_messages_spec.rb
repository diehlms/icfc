require 'rails_helper'

RSpec.describe 'CampMessages', type: :request do
  let(:user) { create(:user) }
  let(:admin) { create(:user, :admin) }

  describe 'POST /camp_messages' do
    context 'when not logged in' do
      it 'redirects to login' do
        post camp_messages_path, params: { camp_message: { message: 'Hello everyone' } }
        expect(response).to redirect_to(login_path)
      end
    end

    context 'when logged in as a regular user' do
      before { web_login(user) }

      it 'denies access' do
        post camp_messages_path, params: { camp_message: { message: 'Hello everyone' } }
        expect(response).to redirect_to(root_path)
        expect(flash[:alert]).to be_present
      end
    end

    context 'when logged in as an admin' do
      before { web_login(admin) }

      it 'creates a global message' do
        expect {
          post camp_messages_path, params: { camp_message: { message: 'Camp is closed Friday' } }
        }.to change(CampMessage, :count).by(1)
      end

      it 'creates the message as not expired' do
        post camp_messages_path, params: { camp_message: { message: 'Camp is closed Friday' } }
        expect(CampMessage.last.expired).to be(false)
      end
    end
  end

  describe 'DELETE /camp_messages/:id' do
    let!(:message) { create(:camp_message, expired: false) }

    context 'when logged in as a regular user' do
      before { web_login(user) }

      it 'denies access' do
        delete camp_message_path(message)
        expect(response).to redirect_to(root_path)
        expect(flash[:alert]).to be_present
        expect(message.reload.expired).to be(false)
      end
    end

    context 'when logged in as an admin' do
      before { web_login(admin) }

      it 'marks the message as expired' do
        delete camp_message_path(message)
        expect(message.reload.expired).to be(true)
      end
    end
  end
end
