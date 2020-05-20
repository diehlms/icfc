class SearchController < ApplicationController
    helper_method :require_user
    before_action :require_user
    
    def index
        if params[:search]
            @articles = Article.where('lower(title) LIKE ? OR lower(content) LIKE ?', "%#{params[:search].downcase}%", "%#{params[:search].downcase}%")
            @cabins = Cabin.where('lower(name) LIKE ? OR lower(description) LIKE ?', "%#{params[:search].downcase}%", "%#{params[:search].downcase}%")
            @users = User.where('lower(firstname) LIKE ? OR lower(lastname) LIKE ? OR lower(username) LIKE ?', "%#{params[:search].downcase}%", "%#{params[:search].downcase}%", "%#{params[:search].downcase}%")
            @events = Event.where('lower(events) LIKE ? OR lower(description) LIKE ?', "%#{params[:search].downcase}", "%#{params[:search].downcase}%")
        end
    end

    private

        def search_params
            params.permit(:search)
        end
end
