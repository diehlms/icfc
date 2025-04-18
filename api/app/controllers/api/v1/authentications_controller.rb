module Api
  module V1
    class AuthenticationsController < ApplicationController
      def login
        @user = User.find_by(email: params[:email].downcase)
        if @user&.authenticate(params[:password])
          token = JsonWebToken.encode(
            first_name: @user.firstname,
            last_name: @user.lastname,
            user_id: @user.id,
            email: @user.email,
            admin: @user.admin
          )
          render json: { token: }, status: :ok
        else
          render json: { error: 'unauthorized' }, status: :unauthorized
        end
      end

      def signup
        @user = User.new(user_params)
        if @user.save
          UserMailer.registration_confirmation(@user).deliver
          UserMailer.new_member_notification(@user).deliver

          render json: {}, status: :ok
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def confirm_email
        @user = User.find_by_confirm_token(params[:token])

        if @user
          if @user.email_activate
            render json: {}, status: :ok
          else
            render json: { error: 'Email activation failed' }, status: :unprocessable_entity
          end
        else
          render json: { error: 'User not found' }, status: :not_found
        end
      end

      private

      def user_params
        params.require(:user).permit(:username, :firstname, :lastname, :email, :phone_number, :password,
                                     :password_confirmation, :confirm_token, :password_reset_token, :verified)
      end
    end
  end
end
