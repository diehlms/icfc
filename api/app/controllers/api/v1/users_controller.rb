# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authorize_request

      def index
        @user = User.all
        render json: user, each_serializer: UserSerializer
      end

      def create
        @user = User.create!(user_params) if logged_in?
        if @user
          render json: @user
        else
          render json: @user.errors
        end
      end

      def show
        user

        render json: user, serializer: UserSerializer
      end

      def profile
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
