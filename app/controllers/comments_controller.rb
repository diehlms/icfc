class CommentsController < ApplicationController

def new
    user = session[:user_id]
    @comment = Comment.new(article_id: params[:article_id])
    @article = Article.find(params[:article_id])
end

def show
    @comments = @articles.comments
end

def index
    @comment = Comment.all
end

def create
    @comment = Comment.new(comment_params)
    @comment.user_id = session[:user_id]
    @articleid = params[:id]
    if @comment.save
        flash[:notice] = "Comment saved"
        redirect_to articles_path
    else
        flash[:error] = "Error saving comment"
        redirect_to articles_path
    end
end

def update
    @comment = Comment.find_by_id(params[:id])
    @comment.update(comment_params)
    flash[:notice] = "Comment updated"
    redirect_to articles_path
end

def edit
    @comment = Comment.find(params[:id])
end

def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to articles_path
end

private

    def comment_params
        params.require(:comment).permit(:comment, :user_id, :article_id)
    end

end
