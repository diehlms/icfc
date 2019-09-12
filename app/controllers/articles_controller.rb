class ArticlesController < ApplicationController

before_action :set_article, only: [:edit, :update, :show, :destroy]
helper_method :current_user, :logged_in?

def new
    @article = current_user.articles.build
end

def show
    user = session[:user_id]
    @comment = Comment.new(article_id: params[:id])
    set_article
    @comments = @article.comments.paginate(page: params[:page]).reorder("created_at DESC")
end

def index
    @articles = Article.paginate(page: params[:page]).reorder("created_at DESC") 
end

def create
    @article = current_user.articles.new(article_params)
    if @article.save
        redirect_to article_path(@article), notice: "Article created"
    else
        render 'new'
    end
end

def update
    set_article
    @article = current_user.articles.find(params[:id])
    if @article.update(article_params)
        redirect_to article_path(@article), notice: "Article updated"
    else
        render 'edit', notice: "There was a problem with updating the article"
    end
end

def edit
    set_article
end

def destroy
    set_article
    @article = current_user.articles.find(params[:id])
    if @article.destroy
        redirect_to articles_path, notice: "Article was deleted"
    else
        redirect_to articles_path
    end
end

private

    def article_params
        params.require(:article).permit(:title, :content, :image)
    end

    def set_article
        @article = Article.find_by_id(params[:id])
    end

    def comment_params
        params.permit(:content, :user_id, :article_id)
    end
end
