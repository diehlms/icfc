# typed: true
# frozen_string_literal: true

class ArticlesController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :set_article, only: %i[show edit update destroy upload_image]
  before_action :require_owner!, only: %i[edit update destroy upload_image]

  def index
    @articles = Article.order(created_at: :desc).paginate(page: params[:page], per_page: 10)
  end

  def show
    @comment = Comment.new
    @comments = @article.comments.order(created_at: :desc)
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params.merge(user_id: current_user.id))
    if @article.save
      redirect_to @article, notice: 'Article created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @article.update(article_params)
      redirect_to @article, notice: 'Article updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @article.destroy
    redirect_to articles_path, notice: 'Article deleted.'
  end

  def upload_image
    if @article.update(image: params[:article][:image])
      redirect_to @article, notice: 'Image uploaded.'
    else
      redirect_to @article, alert: 'Image upload failed.'
    end
  end

  private

  def set_article
    @article = Article.find_by(slug: params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :content, :image, :pinned)
  end

  def require_owner!
    unless @article.user_id == current_user.id || current_user.admin?
      redirect_to @article, alert: 'Not authorized.'
    end
  end
end
