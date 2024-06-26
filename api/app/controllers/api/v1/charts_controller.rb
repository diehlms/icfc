# frozen_string_literal: true

module Api
  module V1
    class ChartsController < ApplicationController
      before_action :authorize_request

      def index
        chart = Chart.all
        render json: chart
      end

      def create
        @chart = Chart.create!(charts_params)
        render json: Chart.all
      end

      def destroy
        set_chart
        render json: Chart.all
      end

      private

      def charts_params
        params.permit(:chart, :caption, :user_id)
      end

      def set_chart
        @chart = Chart.find(params[:id])
      end
    end
  end
end
