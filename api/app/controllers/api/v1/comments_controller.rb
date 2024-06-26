# frozen_string_literal: true
module Api
    module V1
        class CommentsController < ApplicationController
            before_action :authorize_request
        
            def new
                session[:user_id]
                @comment = Comment.new(article_id: params[:article_id])
                @article = Article.find(params[:article_id])
            end
        
            def create
                @comment = Comment.new(comment_params)
                @comment.user_id = session[:user_id]
                @articleid = params[:article_id]
                if @comment.save
                    render :json
                end
            end
            
            def destroy
                @comment = Comment.find(params[:id])
                if @comment.destroy
                    render :json
                end
            end
        
            private
        
            def comment_params
                params.require(:comment).permit(:content, :user_id, :article_id)
            end
        end
    end
end