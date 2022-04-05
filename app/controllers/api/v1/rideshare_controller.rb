class Api::V1::RideshareController < ApplicationController
    before_action :require_user
    helper_method :current_user, :logged_in?, :require_user
    
    def index
        rideshare = Rideshare.all
        render json: rideshare
    end

    def create
        @ridesharet = Rideshare.create!(Rideshare_params) 
        if @rideshare
            render json: Rideshare.all
        else
            render json: Rideshare.all
        end
    end

    def destroy
        set_rideshare
        if @rideshare.destroy
            render json: Rideshare.all
        else
            render json: Rideshare.all
        end
    end

    private

    def rideshare_params
        params.permit(:rideshare, :number_of_passengers, :additional_information, :arriving_at, :departing_at)
    end

    def set_rideshare
        @rideshare = Rideshare.find(params[:id])
    end
end