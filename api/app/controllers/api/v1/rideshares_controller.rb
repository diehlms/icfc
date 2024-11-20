# frozen_string_literal: true

module Api
  module V1
    class RidesharesController < ApplicationController
      before_action :authorize_request
      before_action :rideshare, only: %i[show update destroy]
      before_action :check_authorization, only: %i[update destroy]

      def index
        @rideshares = Rideshare.includes(:point_of_departure, :point_of_arrival).all.where('arriving_at > ?',
                                                                                           Date.today)
                                                                                           render json: @rideshares, each_serializer: RideshareSerializer
      end

      def create
        @rideshare = Rideshare.create!(rideshare_params)
        if @rideshare.save
          render json: Rideshare.all
        else
          render json: {
            errors: @rideshare.errors.full_messages
          }, status: :bad_request
        end
      end

      def show
        @rideshare = Rideshare.includes(:point_of_departure, :point_of_arrival).find(params[:id])
        render json: @rideshare, serializer: RideshareSerializer
      end

      def update
        rideshare
        if rideshare.update(rideshare_params)
          render json: { message: 'rideshare updated!', rideshare: @rideshare }, status: :ok
        else
          render json: { errors: @rideshare.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        rideshare
        if @rideshare.destroy
          render json: {}
        else
          render json: {
            errors: @rideshare.errors.full_messages
          }, status: :bad_request
        end
      end

      private

      def rideshare_params
        params.require(:rideshare).permit(:user_id, :number_of_passengers, :additional_information, :arriving_at,
                                          :departing_at, :point_of_arrival_id, :point_of_departure_id, :seeking)
      end

      def rideshare
        @rideshare = Rideshare.find(params[:id])
      end
    end
  end
end
