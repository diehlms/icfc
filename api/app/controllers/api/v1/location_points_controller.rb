# frozen_string_literal: true

module Api
  module V1
    class LocationPointsController < ApplicationController
      before_action :authorize_request
      before_action :location_point, only: %i[destroy]
      before_action :check_authorization, only: %i[destroy]

      def index
        location_point = LocationPoint.all
        render json: location_point
      end

      def create
        @location_point = LocationPoint.create!(location_point_params)
        render json: LocationPoint.all
      end

      def destroy
        return unless current_user.admin?

        if location_point.destroy
          render json: {}
        else
          render json: {
            errors: location_point.errors.full_messages
          }, status: :bad_request
        end
      end

      private

      def location_point_params
        params.permit(:location_name, :location_description)
      end

      def location_point
        @location = LocationPoint.find(params[:id])
      end
    end
  end
end
