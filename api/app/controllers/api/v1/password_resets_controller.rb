# typed: true
# frozen_string_literal: true

module Api
  module V1
    class PasswordResetsController < ApplicationController
      before_action :verify_captcha!, only: %i[create]

      def create
        user = User.find_by_email(params[:email][:email].downcase)
        user&.send_password_reset
        msg = 'If the email provided is associated with an account, ' \
              'please check the inbox for password reset instructions'
        render json: { message: msg }
      end

      def init_reset_password
        return unless params[:password_reset_token]

        @user = User.find_by_password_reset_token!(params[:password_reset_token])
        render json: @user, serializer: UserSerializer
      end

      def update
        @user = User.find_by_password_reset_token!(params[:password_reset_token])
        if @user.password_reset_sent_at < 24.hours.ago
          render json: { errors: 'Password reset link has expired' }, status: :unprocessable_entity
        elsif @user.update(password_reset_params)
          @user.update(password_reset_token: nil, password_reset_sent_at: nil)
          render json: { message: 'Password has been successfully updated' }, status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def password_reset_params
        params.permit(:password_reset_token, :password, :password_confirmation)
      end
    end
  end
end
