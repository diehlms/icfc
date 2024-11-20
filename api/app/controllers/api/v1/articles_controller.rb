# frozen_string_literal: true

module Api
  module V1
    class ArticlesController < ApplicationController
      before_action :authorize_request
      before_action :article, only: %i[upload_image show update destroy]
      before_action :check_authorization, only: %i[upload_image update destroy]

      def index
        @articles = Article.paginate(page: params[:page], per_page: 3).order(created_at: :desc)
        render json: @articles, each_serializer: ArticleSerializer
      end

      def create
        @article = Article.new(article_params)
        if @article.save
          render json: @article
        else
          render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def upload_image
        if article.update!(image_params)
          render json: { message: 'Image uploaded successfully', article: @article }, status: :ok
        else
          render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        if article
          render json: article, serializer: ArticleSerializer
        else
          render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if article.update(article_params)
          render json: { message: 'Article updated!', article: @article }, status: :ok
        else
          render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if article.destroy
          render json: { message: 'Post deleted!' }
        else
          render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def article_params
        params.require(:article).permit(:title, :content, :image, :pinned, :user_id)
      end

      def image_params
        params.require(:article).permit(:id, :image, :user_id)
      end

      def article
        @article ||= Article.find(params[:id])
      end
    end
  end
end
