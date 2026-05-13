# typed: true
# frozen_string_literal: true

class CampMessagesController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_admin!

  def create
    @message = CampMessage.new(message: params[:camp_message][:message], expired: false)
    if @message.save
      redirect_back fallback_location: root_path, notice: 'Message posted.'
    else
      redirect_back fallback_location: root_path, alert: 'Message could not be posted.'
    end
  end

  def destroy
    @message = CampMessage.find(params[:id])
    @message.update!(expired: true)
    redirect_back fallback_location: root_path, notice: 'Message dismissed.'
  end

  private

  def require_admin!
    redirect_to root_path, alert: 'Not authorized.' unless current_user.admin?
  end
end
