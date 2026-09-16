# typed: true
# frozen_string_literal: true

class SessionsController < ApplicationController
  extend T::Sig

  def new
    redirect_to root_path if logged_in?
  end

  def create
    login = params[:email].to_s.strip
    user = User.find_by(email: login.downcase) || User.where('LOWER(username) = ?', login.downcase).first
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: 'Logged in successfully.'
    else
      flash.now[:alert] = 'Invalid email or password.'
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    session.delete(:user_id)
    redirect_to login_path, notice: 'Logged out successfully.'
  end
end
