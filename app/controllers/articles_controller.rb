class ArticlesController < ApplicationController

before_action :set_article, only: [:edit, :update, :show, :destroy]
helper_method :current_user, :logged_in?

def new
    @article = current_user.articles.build
end

def show
    user = session[:user_id]
    set_article
    @comment = Comment.new(article_id: @article.id)
    if @article
        @comments = @article.comments.paginate(page: params[:page]).order("created_at DESC")
    end
end

def index
    respond_to do |format|
        if params[:search]
            format.html { @articles = Article.where('lower(title) LIKE ? OR lower(content) LIKE ?', "%#{params[:search].downcase}%", "%#{params[:search].downcase}%").paginate(page: params[:page]) }
            format.json { render json: @articles }
        else
            format.html { @articles = Article.paginate(page: params[:page]).reorder("pinned DESC", "created_at DESC") }
            format.json { render json: @articles.errors, status: :unprocessable_entity}
        end
    end
end

def create
    @article = current_user.articles.new(article_params)
    respond_to do |format|
        if @article.save
            format.html { redirect_to article_path(@article), notice: "Article created" }
            format.json { render :show, status: :ok, location: @article}
        else
            flash.now[:error] = "Something went wrong! Try again soon"
            format.html { render :new }
            format.json { render json: @article.errors, status: :unprocessable_entity}
        end
    end
end

def update
    if current_user.admin?
        set_article
    else
        @article = current_user.articles.find(params[:id])
    end
    respond_to do |format|
        if @article.update(article_params)
            format.html { redirect_to article_path(@article), notice: "Article updated" } 
            format.json { render :show, status: :ok, location: @article}
        else
            format.html { render :edit}
            format.json { render json: @article.errors, status: :unprocessable_entity }
        end
    end
end

def toggle_pinned
    set_article
    @article.toggle(:pinned).save
    redirect_to articles_path
end

def edit
    @article = current_user.articles.friendly.find(params[:id])
end

def destroy
    @article = current_user.articles.friendly.find(params[:id])
    respond_to do |format|
        if @article.destroy
            format.html { redirect_to articles_path, notice: "Article was deleted" }
            format.json { head :no_content }
        else
            format.html { redirect_to articles_path }
            format.json { render json: @article.errors, status: :unprocessable_entity}
        end
    end
end

private

    def article_params
        params.require(:article).permit(:title, :content, :pinned, :image, :user_id, :search)
    end

    def set_article
        @article = Article.friendly.find(params[:id])
    end

    def comment_params
        params.permit(:content, :user_id, :article_id)
    end
end
