# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authorize_request

      def index
        user = User.except(
          :password,
          :password_digest,
          :password_confirmation,
          :password_reset_token,
          :admin
        ).all
        render json: user
      end

      def create
        user = User.create!(user_params) if logged_in?
        if user
          render json: user
        else
          render json: user.errors
        end
      end

      def show
        user_to_return = User.select(
          'id',
          'admin',
          'email',
          'firstname',
          'lastname',
          'phone_number',
          'username',
          'username'
        ).find(params[:id])

        render json: user_to_return
      end

      def profile
        user_to_return = User.select(
          'id',
          'admin',
          'email',
          'firstname',
          'lastname',
          'phone_number',
          'username',
          'username'
        ).friendly.find(params[:id])

        articles = user_to_return.articles
        events = user_to_return.events
        cabins = user_to_return.cabins

        payload = {
          'user' => user_to_return,
          'articles' => articles,
          'events' => events,
          'cabins' => cabins
        }
        render json: payload
      end

      def destroy
        user&.destroy
        render json: { message: 'User deleted!' }
      end
    
      def confirm_email
        @user = User.find_by_confirm_token(params[:id])
        if @user
          @user.email_activate
          log_in @user
        else
          return
        end
      end
    
      def toggle_verified
        set_user
        @user.toggle!(:verified)
        UserMailer.verified_confirmation(@user).deliver
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
