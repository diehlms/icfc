# frozen_string_literal: true

module Api
  module V1
    class SearchController < ApplicationController
      before_action :authorize_request

      def search
        return unless params[:search]

        @articles = Article.where('lower(title) LIKE ? OR lower(content) LIKE ?', "%#{params[:search].downcase}%",
                                  "%#{params[:search].downcase}%")
        @cabins = Cabin.where('lower(name) LIKE ? OR lower(description) LIKE ?', "%#{params[:search].downcase}%",
                              "%#{params[:search].downcase}%")
        @users = User.where('lower(firstname) LIKE ? OR lower(lastname) LIKE ? OR lower(username) LIKE ?',
                            "%#{params[:search].downcase}%", "%#{params[:search].downcase}%",
                            "%#{params[:search].downcase}%")
        @events = Event.where('lower(title) LIKE ? OR lower(description) LIKE ?', "%#{params[:search].downcase}",
                              "%#{params[:search].downcase}%")

        render json: {
          articles: @articles,
          cabins: @cabins,
          users: @users,
          events: @events
        }
      end

      private

      def search_params
        params.permit(:search)
      end
    end
  end
end
