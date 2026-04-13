# typed: true
# frozen_string_literal: true

class RidesharesController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!, only: %i[new create edit update destroy]
  before_action :set_rideshare, only: %i[show edit update destroy]
  before_action :require_owner!, only: %i[edit update destroy]

  def index
    @rideshares = Rideshare.where('departing_at >= ?', Time.current).order(:departing_at)
                           .includes(:point_of_departure, :point_of_arrival)
    @rideshare = Rideshare.new
    @location_points = LocationPoint.order(:location_name)
  end

  def show
  end

  def new
    @rideshare = Rideshare.new
    @location_points = LocationPoint.order(:location_name)
  end

  def create
    @rideshare = Rideshare.new(rideshare_params.merge(user_id: current_user.id))
    if @rideshare.save
      redirect_to rideshares_path, notice: 'Rideshare posted.'
    else
      @rideshares = Rideshare.where('departing_at >= ?', Time.current).order(:departing_at)
                             .includes(:point_of_departure, :point_of_arrival)
      @location_points = LocationPoint.order(:location_name)
      render :index, status: :unprocessable_entity
    end
  end

  def edit
    @location_points = LocationPoint.order(:location_name)
  end

  def update
    if @rideshare.update(rideshare_params)
      redirect_to rideshares_path, notice: 'Rideshare updated.'
    else
      @location_points = LocationPoint.order(:location_name)
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @rideshare.destroy
    redirect_to rideshares_path, notice: 'Rideshare deleted.'
  end

  private

  def set_rideshare
    @rideshare = Rideshare.find(params[:id])
  end

  def rideshare_params
    params.require(:rideshare).permit(:departing_at, :arriving_at, :number_of_passengers,
                                      :additional_information, :seeking,
                                      :point_of_departure_id, :point_of_arrival_id)
  end

  def require_owner!
    unless @rideshare.user_id == current_user.id || current_user.admin?
      redirect_to rideshares_path, alert: 'Not authorized.'
    end
  end
end
