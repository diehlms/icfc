class Api::V1::CabinImageController < ApplicationController
    def index
        cabin_images = CabinAttachment.all.order(created_at: :desc) 
        render json: cabin_images unless !logged_in?
    end

    def create
        cabin_image = CabinAttachment.create!(cabin_image_params) unless !logged_in?
        if cabin_image
            render json: cabin_image
        else
            render json: cabin_image.errors
        end
    end

    def show
        if cabin_image
            render json: cabin_image unless !logged_in?
        else
            render json: cabin_image.errors
        end
    end

    def destroy
        cabin_image&.destroy unless !logged_in?
        render json: { message: 'Post deleted!'}
    end

    private

    def cabin_image_params
        params.permit(:image, :cabin_id)
    end

    def cabin_image
        @cabin_image ||= CabinAttachment.find(params[:id])
    end
end