# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authorize_request
      before_action :user, only: %i[show update destroy]
      before_action :check_authorization, only: %i[update destroy]

      def index
        @user = User.all
        render json: user, each_serializer: UserSerializer
      end

      def show
        user

        render json: user, serializer: UserSerializer
      end

      def destroy
        user&.destroy
        render json: { message: 'User deleted!' }
      end

      def confirm_email
        @user = User.find_by_confirm_token(params[:id])
        return unless @user

        @user.email_activate
        log_in @user
      end

      def update
        if user.update(user_params)
          render json: { message: 'User updated!', user: @user }, status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def toggle_verified
        user.toggle!(:verified)
        UserMailer.verified_confirmation(user).deliver
      end

      private

      def user_params
        params.require(:user).permit(:username, :firstname, :lastname, :email, :phone_number)
      end

      def user
        @user ||= User.find(params[:id])
      end
    end
  end
end
