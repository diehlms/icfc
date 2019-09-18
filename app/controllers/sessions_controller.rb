class SessionsController < ApplicationController

    def new
    end

    def create 
        user = User.find_by(email: params[:session][:email].downcase)
        if user && user.authenticate(params[:session][:password])
          if user.email_confirmed
              session[:user_id] = user.id
              redirect_to root_path, notice: "You have logged in"
              remember user
              params[:session][:remember_me] == '1' ? remember(user) : forget(user)
          else
            redirect_to new_session_path, notice: "Please activate your account by following the instructions in the account confirmation email you recieved. "
          end
        else
          redirect_to new_session_path, notice: "Invalid email/password combination"
        end
      end

    def destroy
        forget(current_user)
        session.delete(:user_id)
        @current_user = nil
        flash[:notice] = "logged out successfully"
        redirect_to root_url
    end

end
