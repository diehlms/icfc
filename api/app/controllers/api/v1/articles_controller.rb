# frozen_string_literal: true

module Api
  module V1
    class ArticlesController < ApplicationController
      before_action :authorize_request

      def index
        @articles = Article.includes(:comments).order(created_at: :desc)
        render json: @articles.to_json(include: :comments)
      end

      def create
        article = Article.create!(article_params)
        if article
          render json: article
        else
          render json: article.errors
        end
      end

      def upload_image
        if article.update(image_params)
          render json: { message: 'Image uploaded successfully', article: @article }, status: :ok
        else
          render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        if article
          render json: article.to_json(include: :comments)
        else
          render json: article.errors
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
        article&.destroy
        render json: { message: 'Post deleted!' }
      end

      private

      def article_params
        params.require(:article).permit(:title, :content, :image, :pinned, :user_id)
      end

      def image_params
        params.permit(:image)
      end

      def article
        @article ||= Article.includes(:comments).find(params[:id])
      end
    end
  end
end
