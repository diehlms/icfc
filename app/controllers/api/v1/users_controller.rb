class Api::V1::UsersController < ApplicationController
    def index
        user = User.all
        render json: user unless !logged_in?
    end

    def create
        user = User.create!(user_params) unless !logged_in?
        if user
            render json: user
        else
            render json: user.errors
        end
    end

    def show
        if user
            render json: user unless !logged_in?
        else
            render json: user.errors
        end
    end

    def destroy
        user&.destroy unless !logged_in?
        render json: { message: 'User deleted!'}
    end

    private

    def user_params
        params.require(:user).permit(:username, :firstname, :lastname, :email, :phone_number, :password, :password_confirmation, :confirm_token, :password_reset_token)
    end

    def user
        @user ||= User.find(params[:id])
    end
end