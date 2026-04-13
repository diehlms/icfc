# typed: true
# frozen_string_literal: true

class CabinsController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!, only: %i[new create edit update destroy]
  before_action :set_cabin, only: %i[show edit update destroy]
  before_action :require_owner!, only: %i[edit update destroy]

  def index
    @cabins = Cabin.all
    @cabin = Cabin.new
  end

  def show
    @cabin_date = Cabindate.new
    @cabin_dates = @cabin.cabindates.order(:startdate)
    @attachments = @cabin.cabin_attachments
  end

  def new
    @cabin = Cabin.new
  end

  def create
    @cabin = Cabin.new(cabin_params.merge(user_id: current_user.id))
    if @cabin.save
      redirect_to @cabin, notice: 'Cabin created.'
    else
      @cabins = Cabin.all
      render :index, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @cabin.update(cabin_params)
      redirect_to @cabin, notice: 'Cabin updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @cabin.destroy
    redirect_to cabins_path, notice: 'Cabin deleted.'
  end

  private

  def set_cabin
    @cabin = Cabin.find(params[:id])
  end

  def cabin_params
    params.require(:cabin).permit(:name, :bedrooms, :washerdryer, :dock, :price_per_day, :price_per_week, :description)
  end

  def require_owner!
    unless @cabin.user_id == current_user.id || current_user.admin?
      redirect_to cabins_path, alert: 'Not authorized.'
    end
  end
end
