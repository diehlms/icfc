require 'rails_helper'

RSpec.describe 'Events', type: :request do
  let(:user) { create(:user, :verified) }
  let(:other_user) { create(:user, :verified) }
  let(:event) { create(:event, user: user) }

  describe 'GET /events/:id' do
    context 'when not logged in' do
      it 'redirects to login' do
        get event_path(event)
        expect(response).to redirect_to(login_path)
      end
    end

    context 'when logged in' do
      before { web_login(user) }

      it 'renders the event detail page' do
        get event_path(event)
        expect(response).to be_successful
      end

      it 'shows the event title' do
        get event_path(event)
        expect(response.body).to include(event.title)
      end
    end
  end

  describe 'DELETE /events/:id' do
    context 'when logged in as another user' do
      before { web_login(other_user) }

      it 'denies deletion' do
        delete event_path(event)
        expect(response).to redirect_to(events_path)
        expect(flash[:alert]).to be_present
        expect { event.reload }.not_to raise_error
      end
    end

    context 'when logged in as the owner' do
      before { web_login(user) }

      it 'deletes the event' do
        event_id = event.id
        expect {
          delete event_path(event)
        }.to change(Event, :count).by(-1)
        expect(response).to redirect_to(events_path)
      end
    end
  end
end
