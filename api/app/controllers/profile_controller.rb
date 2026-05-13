# typed: true
# frozen_string_literal: true

class ProfileController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!

  def show; end

  def update
    if current_user.update(profile_params)
      redirect_to profile_path, notice: 'Profile updated.'
    else
      render :show, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:user).permit(:firstname, :lastname, :phone_number, :email)
  end
end
