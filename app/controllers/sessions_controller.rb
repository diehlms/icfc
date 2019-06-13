class SessionsController < ApplicationController

    def new
    end

    def create 
        user = User.find_by(email: params[:session][:email].downcase)
        if user # && user.authenticate(params[:session][:password])
        # if user.email_confirmed
            session[:user_id] = user.id
            redirect_to '/blog', notice: "You have logged in"
        # else
        #   flash.now[:error] = "Please activate your account by following the instructions in the account confirmation email you recieved. "
        #   render 'new'
        # end
        else
          render 'new', notice: "Invalid email/password combination"
        end
      end

    def destroy
        session.delete(:user_id)
        @current_user = nil
        redirect_to root_url
    end

end
