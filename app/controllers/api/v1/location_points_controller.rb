class Api::V1::LocationPointsController < ApplicationController
    before_action :require_user
    helper_method :current_user, :logged_in?, :require_user
    
    def index
        location_point = LocationPoint.all
        render json: location_point
    end

    def single
        set_location_point
        render json: @location
    end

    def create
        @location_point = LocationPoint.create!(location_point_params) 
        if @location_point
            render json: LocationPoint.all
        else
            render json: LocationPoint.all
        end
    end

    def destroy
        if current_user.admin?
            set_location_point
            if @location.destroy
                render json: LocationPoint.all
            else
                render json: LocationPoint.all
            end
        end
    end

    private

    def location_point_params
        params.permit(:location_name, :location_description)
    end

    def set_location_point
        @location = LocationPoint.find(params[:id])
    end
end