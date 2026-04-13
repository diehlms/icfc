# typed: true
# frozen_string_literal: true

class CommentsController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!
  before_action :set_article

  def create
    @comment = @article.comments.build(content: params[:comment][:content], user_id: current_user.id)
    if @comment.save
      redirect_to @article, notice: 'Comment added.'
    else
      redirect_to @article, alert: 'Could not add comment.'
    end
  end

  def destroy
    @comment = @article.comments.find(params[:id])
    unless @comment.user_id == current_user.id || current_user.admin?
      return redirect_to @article, alert: 'Not authorized.'
    end

    @comment.destroy
    redirect_to @article, notice: 'Comment deleted.'
  end

  private

  def set_article
    @article = Article.friendly.find(params[:article_id])
  end
end
