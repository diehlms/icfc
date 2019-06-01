class UsersController < ApplicationController

before_action :set_user, only: [:show, :edit, :update, :destroy]

def new
    @user = User.new
end

def show
end

def index
    @users = User.all
end

def create
    @user = User.new(user_params)
    if @user.save
        # UserMailer.registration_confirmation(@user).deliver
        flash[:success] = "User created"
        redirect_to users_path
    else
        flash.now[:error] = "Something went wrong"
    end
end

def update
    respond_to do |format|
        if @user.update(user_params)
            format.html { redirect_to @user, notic: 'User was successfully updated'}
            format.json { render :show, status: :ok, location: @user }
        else
            format.html { render :edit }
            format.json { render json: @user.errors, status: :unproccessable_entity }
        end
    end
end

def edit
end

def destroy
    @user.destroy
    respond_to do |format|
        format.html { redirect_to users_url, notice: "User successfully destroy" }
        format.json { head :no_content }
    end
end

# def confirm_email
#     user = User.find_by_confirm_token(params[:id])
#     if user
#         user.email_activate
#         flash[:success] = "Welcome to the the ICFC blog"
#         redirect_to articles_path
#     else
#         flash[:error] = "Sorry, user does not exist"
#         redirect_to root_url
#     end
# end

private


    def set_user
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end

    def user_params
        @user = User.find(params[:id])
    end

end
