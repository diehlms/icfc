# typed: true
# frozen_string_literal: true

class PasswordResetsController < ApplicationController
  extend T::Sig

  def new; end

  def create
    @user = User.find_by(email: params[:email]&.downcase)
    if @user
      @user.send_password_reset
      redirect_to login_path, notice: 'Password reset instructions sent to your email.'
    else
      flash.now[:alert] = 'No account found with that email address.'
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @user = User.find_by_password_reset_token(params[:token])
    if @user.nil?
      redirect_to new_password_reset_path, alert: 'Password reset link is invalid or expired.'
    end
  end

  def update
    @user = User.find_by_password_reset_token(params[:token])
    if @user.nil?
      redirect_to new_password_reset_path, alert: 'Password reset link is invalid or expired.'
    elsif @user.update(password_params)
      session[:user_id] = @user.id
      redirect_to root_path, notice: 'Password updated successfully.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
