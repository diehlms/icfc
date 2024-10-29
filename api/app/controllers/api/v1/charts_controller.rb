# frozen_string_literal: true

module Api
  module V1
    class ChartsController < ApplicationController
      before_action :authorize_request
      before_action :chart, only: %i[show destroy]
      before_action :check_authorization, only: %i[destroy destroy]

      def index
        chart = Chart.all
        render json: chart, each_serializer: ChartSerializer
      end

      def create
        @chart = Chart.create!(charts_params)
        render json: Chart.all
      end

      def show
        chart = Chart.find(params[:id])
        render json: chart, serializer: ChartSerializer
      end

      def destroy
        chart
        if @chart.destroy
          render json: {}
        else
          render json: @chart.errors
        end
      end

      private

      def charts_params
        params.require(:chart).permit(:chart, :caption, :user_id)
      end

      def chart
        @chart = Chart.find(params[:id])
      end
    end
  end
end
