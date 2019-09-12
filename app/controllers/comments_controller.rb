class CommentsController < ApplicationController

  def new
    user = session[:user_id]
    @comment = Comment.new(article_id: params[:article_id])
    @article = Article.find(params[:article_id])
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = session[:user_id]
    @articleid = params[:article_id]
        if @comment.save
            flash[:notice] = "Comment saved"
            redirect_to articles_path
        else
            flash[:error] = "Error saving comment"
            redirect_to articles_path
        end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to '/articles'
  end

  private 

    def comment_params
      params.require(:comment).permit(:content, :user_id, :article_id)
    end

end
