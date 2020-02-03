class Api::V1::CabinsController < ApplicationController
    def index
        cabin = Cabin.all.order(created_at: :desc)
        render json: cabin
    end

    def create
        cabin = Cabin.create!(cabin_params)
        if cabin
            render json: cabin
        else
            render json: cabin.errors
        end
    end

    def show
        if cabin
            render json: cabin
        else
            render json: cabin.errors
        end
    end

    def destroy
        cabin&.destroy
        render json: { message: 'Post deleted!'}
    end

    # def edit
    # end

    # def update
    # end

    private

    def cabin_params
        params.require(:cabin).permit(:name, :bedrooms, :washerdryer, :dock, :user_id, :price_per_week, :price_per_day, :description, cabin_attachments_attributes: [:id, :cabin_id, :image])
    end

    def cabin
        @cabin ||= Cabin.find(params[:id])
    end
end