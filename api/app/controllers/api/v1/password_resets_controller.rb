# frozen_string_literal: true

module Api
  module V1
    class PasswordResetsController < ApplicationController
      def new; end

      def create
        user = User.find_by_email(params[:email].downcase)
        user&.send_password_reset
        render json: {
          message: 'If the email provided is associated with an account, please check the inbox for password reset instructions'
        }
      end

      def init_reset_password
        @user = User.find_by_password_reset_token!(params[:password_reset_token])
        render json: @user, serializer: UserSerializer
      end

      def update
        @user = User.find_by_password_reset_token!(params[:password_reset_token])
        if @user.password_reset_sent_at < 24.hours.ago
          render json: { errors: 'Password reset link has expired' }, status: :unprocessable_entity
        # Try to update the user's password
        elsif @user.update(password_params)
          # Clear the reset token to prevent reuse
          @user.update(password_reset_token: nil, password_reset_sent_at: nil)
          render json: { message: 'Password has been successfully updated' }, status: :ok
        else
          # Return validation errors if the update fails
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def password_params
        params.permit(:password_reset_token, :password, :password_confirmation)
      end
    end
  end
end
