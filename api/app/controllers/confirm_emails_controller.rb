# typed: true
# frozen_string_literal: true

class ConfirmEmailsController < ApplicationController
  extend T::Sig

  def show
    @user = User.find_by_confirm_token(params[:token])
    if @user&.email_activate
      redirect_to login_path, notice: 'Email confirmed! You can now log in.'
    else
      redirect_to login_path, alert: 'Confirmation link is invalid or already used.'
    end
  end
end
