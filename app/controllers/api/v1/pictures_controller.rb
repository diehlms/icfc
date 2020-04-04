class Api::V1::PicturesController < ApplicationController
    def index
        picture = Gallery.all.order(created_at: :desc)
        render json: picture
    end

    def create
        picture = Gallery.create!(picture_params)
        if cabin
            render json: picture
        else
            render json: picture.errors
        end
    end

    def show
        if picture
            render json: picture
        else
            render json: picture.errors
        end
    end

    def destroy
        picture&.destroy
        render json: { message: 'Post deleted!'}
    end

    private

    def picture_params
        params.require(:picture).permit(:image, :caption, :user_id)
    end

    def cabin
        @picture ||= Gallery.find(params[:id])
    end
end