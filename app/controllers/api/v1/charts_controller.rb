class Api::V1::ChartsController < ApplicationController
    def index
        chart = Chart.all
        render json: chart
    end

    def create
        @chart = Chart.create!(charts_params) 
        if @chart
            render json: Chart.all
        else
            render json: Chart.all
        end
    end

    def destroy
        set_chart
        if @chart.destroy
            render json: Chart.all
        else
            render json: Chart.all
        end
    end

    private

    def charts_params
        params.permit(:chart, :caption, :user_id)
    end

    def set_chart
        @chart = Chart.find(params[:id])
    end
end