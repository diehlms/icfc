class Api::V1::ArticlesController < ApplicationController

    def index
        article = Article.all.order(created_at: :desc)
        render json: article
    end

    def create
        article = Article.create!(article_params)
        if article
            render json: article
        else
            render json: article.errors
        end
    end

    def show
        if article
            render json: article
        else
            render json: article.errors
        end
    end

    def destroy
        article&.destroy
        render json: { message: 'Post deleted!'}
    end

    private

    def article_params
        params.permit(:title, :content, :image, :pinned, :user_id)
    end

    def article
        @article ||= Article.find(params[:id])
    end
end