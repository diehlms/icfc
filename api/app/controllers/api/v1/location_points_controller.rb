# frozen_string_literal: true

module Api
  module V1
    class LocationPointsController < ApplicationController
      before_action :authorize_request

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
        render json: LocationPoint.all
      end

      def destroy
        return unless current_user.admin?

        set_location_point
        if @location.destroy
          render json: LocationPoint.all
        else
          render json: {
            errors: @location.errors.full_messages
          }, status: :bad_request
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
  end
end
