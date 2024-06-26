# frozen_string_literal: true

module Api
  module V1
    class ArticlesController < ApplicationController
      before_action :authorize_request

      def index
        articles = Article.all.order(created_at: :desc)
        render json: articles
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
        render json: { message: 'Post deleted!' }
      end

      private

      def article_params
        params.permit(:title, :content, :image, :pinned, :user_id)
      end

      def article
        @article ||= Article.find(params[:id])
      end
    end
  end
end
