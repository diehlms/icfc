class ArticlesController < ApplicationController

def new
    @article = Article.new
end

def show
    set_article
end

def index
    @articles = Article.all
end

def create
    @article = Article.new
    if @article.save
    else
    end
end

def update
end

def edit
end

def destroy
end

private

    def article_params
    end

    def set_article
        @article = Article.find(params[:id])
    end

end
