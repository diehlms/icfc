class Api::V1::CabinDateController < ApplicationController
    def index
        cabin_date = Cabindate.all
        render json: cabin_date unless !logged_in?
    end

    def create
        cabin_date = Cabindate.create!(cabin_date_params) unless !logged_in?
        if cabin_date
            render json: cabin_date
        else
            render json: cabin_date.errors
        end
    end

    def destroy
        cabin_date&.destroy unless !logged_in?
        render json: { message: 'Post deleted!'}
    end

    private

    def cabin_date_params
        params.permit(:startdate, :enddate, :cabin_id)
    end

    def cabin_date
        @cabin_date ||= Cabindate.find(params[:id])
    end
end