# typed: true
# frozen_string_literal: true

class CabinDatesController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!
  before_action :set_cabin

  def create
    @cabin_date = @cabin.cabindates.build(cabin_date_params)
    if @cabin_date.save
      redirect_to @cabin, notice: 'Dates added.'
    else
      redirect_to @cabin, alert: @cabin_date.errors.full_messages.join(', ')
    end
  end

  def destroy
    @cabin_date = @cabin.cabindates.find(params[:id])
    @cabin_date.destroy
    redirect_to @cabin, notice: 'Dates removed.'
  end

  private

  def set_cabin
    @cabin = Cabin.find(params[:cabin_id])
  end

  def cabin_date_params
    params.require(:cabindate).permit(:startdate, :enddate)
  end
end
