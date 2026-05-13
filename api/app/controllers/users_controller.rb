# typed: true
# frozen_string_literal: true

class UsersController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :set_user, only: %i[show update verify destroy]

  def index
    @users = User.order(:lastname, :firstname)
  end

  def show; end

  def update
    unless @user.id == current_user.id || current_user.admin?
      return redirect_to users_path, alert: 'Not authorized.'
    end

    if @user.update(user_params)
      redirect_to @user, notice: 'Profile updated.'
    else
      render :show, status: :unprocessable_entity
    end
  end

  def verify
    require_admin!
    @user.update(verified: !@user.verified)
    redirect_to @user, notice: "User #{@user.verified ? 'verified' : 'unverified'}."
  end

  def destroy
    require_admin!
    return redirect_to users_path, alert: 'Cannot delete your own account.' if @user == current_user

    @user.destroy
    redirect_to users_path, notice: 'User deleted.'
  end

  private

  def set_user
    @user = User.find_by(slug: params[:id])
  end

  def user_params
    params.require(:user).permit(:firstname, :lastname, :phone_number, :email)
  end
end
