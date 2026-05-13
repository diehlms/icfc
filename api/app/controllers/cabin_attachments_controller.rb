# typed: true
# frozen_string_literal: true

class CabinAttachmentsController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!
  before_action :set_cabin

  def create
    @attachment = @cabin.cabin_attachments.build(image: params[:cabin_attachment][:image])
    if @attachment.save
      redirect_to @cabin, notice: 'Image uploaded.'
    else
      redirect_to @cabin, alert: 'Image upload failed.'
    end
  end

  def destroy
    @attachment = @cabin.cabin_attachments.find(params[:id])
    unless @cabin.user_id == current_user.id || current_user.admin?
      return redirect_to @cabin, alert: 'Not authorized.'
    end

    @attachment.destroy
    redirect_to @cabin, notice: 'Image removed.'
  end

  private

  def set_cabin
    @cabin = Cabin.find(params[:cabin_id])
  end
end
