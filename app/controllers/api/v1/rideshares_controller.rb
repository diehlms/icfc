class Api::V1::RidesharesController < ApplicationController
    before_action :require_user
    helper_method :current_user, :logged_in?, :require_user
    
    def index
        rideshare = Rideshare.all.where("arriving_at > ?", Date.today)
        render json: rideshare
    end

    def create
        @rideshare = Rideshare.create(rideshare_params) 
        if @rideshare.save
            render json: Rideshare.all
        else
            render json: { 
                :errors => @rideshare.errors.full_messages
            }, status: :bad_request
        end
    end


    def destroy
        @rideshare = current_user.rideshares.find(params[:id])
        if @rideshare.destroy
            render json: Rideshare.all
        else
            render json: Rideshare.all
        end
    end

    private

    def rideshare_params
        params.require(:rideshare).permit(:user_id, :number_of_passengers, :additional_information, :arriving_at, :departing_at, :point_of_arrival_id, :point_of_departure_id, :seeking)
    end

    def set_rideshare
        @rideshare = Rideshare.find(params[:id])
    end
end