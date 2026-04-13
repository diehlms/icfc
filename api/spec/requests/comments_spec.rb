require 'rails_helper'

RSpec.describe 'Comments', type: :request do
  let(:user) { create(:user, :verified) }
  let(:article) { create(:article, user: user) }

  describe 'POST /articles/:article_id/comments' do
    context 'when not logged in' do
      it 'redirects to login' do
        post article_comments_path(article), params: { comment: { content: 'Hello' } }
        expect(response).to redirect_to(login_path)
      end
    end

    context 'when logged in as an unverified user' do
      let(:unverified) { create(:user) }
      before { web_login(unverified) }

      it 'blocks comment creation' do
        expect {
          post article_comments_path(article), params: { comment: { content: 'Hello' } }
        }.not_to change(Comment, :count)
        expect(response).to redirect_to(root_path)
      end
    end

    context 'when logged in' do
      before { web_login(user) }

      it 'creates a comment using the article slug' do
        expect {
          post article_comments_path(article), params: { comment: { content: 'Great article!' } }
        }.to change(Comment, :count).by(1)
        expect(response).to redirect_to(article_path(article))
      end

      it 'sets the correct user and article on the comment' do
        post article_comments_path(article), params: { comment: { content: 'Nice post' } }
        comment = Comment.last
        expect(comment.user_id).to eq(user.id)
        expect(comment.article_id).to eq(article.id)
      end

      it 'does not create a comment with blank content' do
        expect {
          post article_comments_path(article), params: { comment: { content: '' } }
        }.not_to change(Comment, :count)
        expect(response).to redirect_to(article_path(article))
        expect(flash[:alert]).to be_present
      end
    end
  end

  describe 'DELETE /articles/:article_id/comments/:id' do
    let!(:comment) { create(:comment, user: user, article: article) }
    let(:other_user) { create(:user, :verified) }

    context 'when logged in as the comment owner' do
      before { web_login(user) }

      it 'destroys the comment' do
        expect {
          delete article_comment_path(article, comment)
        }.to change(Comment, :count).by(-1)
        expect(response).to redirect_to(article_path(article))
      end
    end

    context 'when logged in as another user' do
      before { web_login(other_user) }

      it 'does not destroy the comment' do
        expect {
          delete article_comment_path(article, comment)
        }.not_to change(Comment, :count)
        expect(flash[:alert]).to be_present
      end
    end

    context 'when logged in as an admin' do
      let(:admin) { create(:user, :admin) }
      before { web_login(admin) }

      it 'can destroy any comment' do
        expect {
          delete article_comment_path(article, comment)
        }.to change(Comment, :count).by(-1)
      end
    end
  end
end
