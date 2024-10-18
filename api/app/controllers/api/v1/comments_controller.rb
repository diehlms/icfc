# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :authorize_request

      def create
        @comment = Comment.create!(comment_params)
        if @comment
          render json: @comment
        else
          render json: @comment.errors
        end
      end

      def destroy
        @comment = Comment.find(params[:id])
        if @comment.destroy
          render json: {}
        else
          render json: @comment.errors
        end
      end

      private

      def comment_params
        params.require(:comment).permit(:content, :user_id, :article_id)
      end
    end
  end
end
