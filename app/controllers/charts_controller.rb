class ChartsController < ApplicationController
    helper_method :require_user
    before_action :require_user

    def index
        @chart = Chart.new
        @charts = Chart.paginate(page: params[:page])
    end

    def create
        @chart = current_user.charts.new(charts_params)
        if @chart.save
            flash[:notice] = "Added Chart"
            redirect_to charts_path
        else
            flash[:notice] = "something went wrong with chart upload"
            redirect_to charts_path
        end
    end

    def show
        set_chart
    end

    def destroy
        set_chart
        if @chart.destroy
            flash[:notice] = "chart removed"
            redirect_to charts_path
        else
            flash[:notice] = "something went wrong while deleting the chart"
            redirect_to charts_path
        end
    end

    private

    def charts_params
        params.require(:chart).permit(:chart, :caption, :user_id)
    end

    def set_chart
        @chart = Chart.find(params[:id])
    end
end