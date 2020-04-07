class Api::V1::PicturesController < ApplicationController
    def index
        picture = Gallery.all.order(created_at: :desc)
        render json: picture unless !logged_in?
    end

    def create
        picture = Gallery.create!(picture_params) unless !logged_in?
        if cabin
            render json: picture
        else
            render json: picture.errors
        end
    end

    def show
        if picture
            render json: picture unless !logged_in?
        else
            render json: picture.errors
        end
    end

    def destroy
        picture&.destroy unless !logged_in?
        render json: { message: 'Post deleted!'}
    end

    private

    def picture_params
        params.permit(:image, :caption, :user_id)
    end

    def picture
        @picture ||= Gallery.find(params[:id])
    end
end