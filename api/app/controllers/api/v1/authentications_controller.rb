module Api
  module V1
    class AuthenticationsController < ApplicationController
      def login
        @user = User.find_by(email: params[:email])
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
        respond_to do |format|
          if @user.save
            UserMailer.registration_confirmation(@user).deliver
            UserMailer.new_member_notification(@user).deliver
            format.json { render json: @user }
          else
            format.html { render :new }
            format.json { render json: @user.errors, status: :unprocessable_entity }
          end
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
