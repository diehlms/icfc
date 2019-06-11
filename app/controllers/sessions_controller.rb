class SessionsController < ApplicationController

    def new
    end

    def create 
        user = User.find_by(email: params[:session][:email].downcase)
        if user && user.authenticate(params[:session][:password])
        if user.email_confirmed  
            session[:user_id] = user.id
            flash[:success] = "You have logged in"
            redirect_to '/blog'
        else
          flash.now[:error] = "Please activate your account by following the instructions in the account confirmation email you recieved. "
          render 'new'
        end
        else
          flash.now[:error] = "Invalid email/password combination"
          render 'new'
        end
      end

    def destroy
        session.delete(:user_id)
        @current_user = nil
        redirect_to root_url
    end

end
