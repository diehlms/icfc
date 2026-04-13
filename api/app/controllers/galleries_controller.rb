# typed: true
# frozen_string_literal: true

class GalleriesController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!, only: %i[create destroy]
  before_action :set_gallery, only: %i[destroy]

  def index
    @galleries = Gallery.order(created_at: :desc).paginate(page: params[:page], per_page: 30)
    @gallery = Gallery.new
  end

  def create
    @gallery = Gallery.new(gallery_params.merge(user_id: current_user.id))
    if @gallery.save
      redirect_to galleries_path, notice: 'Photo uploaded.'
    else
      @galleries = Gallery.order(created_at: :desc).paginate(page: params[:page], per_page: 30)
      render :index, status: :unprocessable_entity
    end
  end

  def destroy
    unless @gallery.user_id == current_user.id || current_user.admin?
      return redirect_to galleries_path, alert: 'Not authorized.'
    end

    @gallery.destroy
    redirect_to galleries_path, notice: 'Photo deleted.'
  end

  private

  def set_gallery
    @gallery = Gallery.find(params[:id])
  end

  def gallery_params
    params.require(:gallery).permit(:image, :caption)
  end
end
