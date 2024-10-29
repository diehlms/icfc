# frozen_string_literal: true

module Api
  module V1
    class CabinDatesController < ApplicationController
      before_action :authorize_request
      before_action :cabin_date, only: %i[destroy]
      before_action :check_authorization, only: %i[destroy]

      def index
        @cabin_dates = Cabindate.find_by(id: params[:cabin_id])
        render json: @cabin_dates
      end

      def create
        @cabin_date = Cabindate.create!(cabin_date_params)
        if @cabin_date
          render json: {}
        else
          render json: @cabin_date.errors
        end
      end

      def destroy
        return unless @cabin_date.destroy

        render json: {}
      end

      private

      def cabin_date
        @cabin_date = Cabindate.find_by_id(params[:id])
      end

      def cabin_date_params
        params.require(:cabindate).permit(:startdate, :enddate, :cabin_id)
      end
    end
  end
end
