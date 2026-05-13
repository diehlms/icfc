# typed: true
# frozen_string_literal: true

class SearchController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!

  def index
    @query = params[:q].to_s.strip

    if @query.present?
      like = "%#{@query}%"
      @articles = Article.where('title ILIKE ? OR content ILIKE ?', like, like).limit(10)
      @events   = Event.where('title ILIKE ? OR description ILIKE ?', like, like).limit(10)
      @cabins   = Cabin.where('name ILIKE ? OR description ILIKE ?', like, like).limit(10)
      @users    = User.where('firstname ILIKE ? OR lastname ILIKE ? OR username ILIKE ?', like, like, like).limit(10)
    end

    respond_to do |format|
      format.html
      format.json do
        render json: {
          articles: @articles&.map { |a| { id: a.id, title: a.title } },
          events:   @events&.map   { |e| { id: e.id, title: e.title } },
          cabins:   @cabins&.map   { |c| { id: c.id, name: c.name } },
          users:    @users&.map    { |u| { id: u.id, firstname: u.firstname, lastname: u.lastname } }
        }
      end
    end
  end
end
