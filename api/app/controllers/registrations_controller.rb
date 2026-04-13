# typed: true
# frozen_string_literal: true

class RegistrationsController < ApplicationController
  extend T::Sig

  def new
    redirect_to root_path if logged_in?
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      UserMailer.registration_confirmation(@user).deliver_later
      UserMailer.new_member_notification(@user).deliver_later
      redirect_to login_path, notice: 'Account created! Please check your email to confirm your address.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :firstname, :lastname, :email, :phone_number,
                                 :password, :password_confirmation)
  end
end
