class UsersController < ApplicationController
    before_action :set_user, only: [:show, :edit, :update, :destroy]
    helper_method :require_user
    before_action :require_user, only: [:show, :edit, :update, :destroy, :index]
  
    def index
      @users = User.all.paginate(page: params[:page]).reorder('lastname ASC')
    end

    def show
    end
  
    def new
      @user = User.new
    end
  
    def edit
    end
  
    def create
      @user = User.new(user_params)
      respond_to do |format|
        if @user.save
          UserMailer.registration_confirmation(@user).deliver
          UserMailer.new_member_notification(@user).deliver
          flash[:notice] = "A registration link was just emailed to you. Please follow the link in your inbox to continue. If not in your main inbox, please check your spam folder."
          format.html { redirect_to root_url }
        else
          flash.now[:error] = "Something went wrong! Try again."
          format.html { render :new }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end
  
    def update
      respond_to do |format|
        if @user.update(user_params)
          format.html { redirect_to @user, notice: 'User was successfully updated.' }
          format.json { render :show, status: :ok, location: @user }
        else
          format.html { render :edit }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end
      end
    end
  
    def destroy
      @user.destroy
      respond_to do |format|
        format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
        format.json { head :no_content }
      end
    end
  
    def confirm_email
      user = User.find_by_confirm_token(params[:id])
      if user
        user.email_activate
        flash[:success] = "Welcome to ICFC! Your email has been confirmed. Please sign in to continue"
        redirect_to login_url
      else
        flash[:error] = "Sorry. User information does not exist."
        redirect_to root_url
      end
    end

    def toggle_verified
      set_user
      @user.toggle!(:verified)
      UserMailer.verified_confirmation(@user).deliver
      redirect_back(fallback_location: root_path)
    end
  
    private
      def set_user
        @user = User.friendly.find(params[:id])
      end
  
      def user_params
        params.require(:user).permit(:username, :firstname, :lastname, :email, :phone_number, :password, :password_confirmation, :confirm_token, :password_reset_token, :verified)
      end
  end