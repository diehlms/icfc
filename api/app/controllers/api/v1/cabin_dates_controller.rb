# frozen_string_literal: true

module Api
  module V1
    class CabinDatesController < ApplicationController
      before_action :authorize_request

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
        @cabin_date.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      end

      private

      def cabin_date_params
        params.require(:cabindate).permit(:startdate, :enddate, :cabin_id)
      end
    end
  end
end
