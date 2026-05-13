# typed: true
# frozen_string_literal: true

class LocationPointsController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!

  def new
    @location_point = LocationPoint.new
  end

  def create
    @location_point = LocationPoint.new(location_point_params)
    if @location_point.save
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_back fallback_location: rideshares_path, notice: 'Location added.' }
      end
    else
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.replace("new_location_form", partial: "location_points/form", locals: { location_point: @location_point }) }
        format.html { redirect_back fallback_location: rideshares_path, alert: @location_point.errors.full_messages.to_sentence }
      end
    end
  end

  private

  def location_point_params
    params.require(:location_point).permit(:location_name)
  end
end
