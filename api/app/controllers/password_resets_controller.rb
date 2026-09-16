# typed: true
# frozen_string_literal: true

class PasswordResetsController < ApplicationController
  extend T::Sig

  def new; end

  def create
    login = params[:email].to_s.strip
    @user = User.find_by(email: login.downcase) || User.where('LOWER(username) = ?', login.downcase).first
    if @user
      @user.send_password_reset
      redirect_to login_path, notice: 'Password reset instructions sent to your email.'
    else
      flash.now[:alert] = 'No account found with that email address.'
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @user = find_user_by_valid_token
    if @user.nil?
      redirect_to new_password_reset_path, alert: 'Password reset link is invalid or expired.'
    end
  end

  def update
    @user = find_user_by_valid_token
    if @user.nil?
      redirect_to new_password_reset_path, alert: 'Password reset link is invalid or expired.'
    elsif @user.update(password_params)
      @user.update_columns(password_reset_token: nil, password_reset_sent_at: nil)
      session[:user_id] = @user.id
      redirect_to root_path, notice: 'Password updated successfully.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def find_user_by_valid_token
    return nil if params[:token].blank?

    User.find_by_password_reset_token(params[:token])
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
