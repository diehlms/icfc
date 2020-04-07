class Api::V1::CommentsController < ApplicationController

    def index
        comment = Comment.all.order(created_at: :desc) 
        render json: comment unless !logged_in?
    end

    def create
        comment = Comment.create!(comment_params) unless !logged_in?
        if comment
            render json: comment
        else
            render json: comment.errors
        end
    end

    def show
        if comment
            render json: comment unless !logged_in?
        else
            render json: comment.errors
        end
    end

    def destroy
        comment&.destroy unless !logged_in?
        render json: { message: 'Post deleted!'}
    end

    private

    def comment_params
        params.permit(:user_id, :content, :article_id)
    end

    def comment
        @comment ||= Comment.find(params[:id])
    end
end