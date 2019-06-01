class ArticlesController < ApplicationController

before_action :set_article, only: [:edit, :update, :show, :destroy]
helper_method :current_user, :logged_in?


def new
    @article = current_user.articles.build
end

def show
    set_article
    @comments = @article.comments
end

def index
    @articles = Article.all
end

def create
    @article = current_user.articles.new(article_params)
    if @article.save
        flash[:notice] = "Article created"
        redirect_to article_path(@article)
    else
        render 'new'
    end
end

def update
    set_article
    @article = current_user.articles.find(params[:id])
    if @article.update(article_params)
        flash[:notice] = "Article updated"
        redirect_to article_path(@article)
    else
        flash[:notice] = "There was a problem with updating the article"
        render 'edit'
    end
end


def edit
    set_article
end

def destroy
    set_article
    @article = current_user.articles.find(params[:id])
    if @article.destroy
        flash[:notice] = "Article was deleted"
        redirect_to articles_path
    else
        redirect_to articles_path
    end
end

private

    def article_params
        params.require(:article).permit(:title, :content)
    end

    def set_article
        @article = Article.find(params[:id])
    end

end
