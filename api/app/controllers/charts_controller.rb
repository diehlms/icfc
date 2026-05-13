# typed: true
# frozen_string_literal: true

class ChartsController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!

  def index
    @charts = current_user.charts.order(created_at: :desc)
  end

  def new
    @chart = Chart.new
  end

  def create
    @chart = Chart.new(chart_params)
    @chart.user = current_user

    if @chart.save
      render json: { message: 'Chart saved successfully', redirect_url: charts_path }, status: :created
    else
      render json: { errors: @chart.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @chart = current_user.charts.find(params[:id])
    @chart.destroy
    redirect_to charts_path, notice: 'Chart deleted.'
  end

  private

  def chart_params
    params.require(:chart).permit(:caption, :chart)
  end
end
