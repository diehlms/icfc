class Api::V1::UsersController < ApplicationController
    before_action :require_user
    helper_method :current_user, :logged_in?, :require_user

    def index
        user = User.except(
            :password, 
            :password_digest,
            :password_confirmation, 
            :password_reset_token,
            :admin
        ).all
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
        if user_to_return
            render json: user_to_return unless !logged_in?
        else
            render json: user_to_return.errors
        end
    end

    def destroy
        user&.destroy unless !logged_in?
        render json: { message: 'User deleted!'}
    end

    private

    def user_params
        params.require(:user).permit(:username, :firstname, :lastname, :email, :phone_number)
    end

    def user
        @user ||= User.find(params[:id])
    end
end