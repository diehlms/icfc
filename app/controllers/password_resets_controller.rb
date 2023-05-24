class PasswordResetsController < ApplicationController
    def new
    end

    def create
        user = User.find_by_email(params[:email].downcase)
        user.send_password_reset if user
        redirect_to root_url, :notice => "Email sent with password reset instructions"
    end

    def edit
        @user = User.find_by_password_reset_token!(params[:id])
    end

    def update
        @user = User.find_by_password_reset_token!(params[:id])
        if @user.password_reset_sent_at < 24.hours.ago
            redirect_to new_password_reset_path, notice: "Password reset link has expired"
        elsif @user.update(params.permit![:user])
            log_in @user
            redirect_to root_url, :notice => "Password has been reset!"
        else
            render 'edit'
        end
    end

end