class ApplicationController < ActionController::Base
    def current_user
        if session[:user_id]
            @current_user ||= User.find_by(id: session[:user_id])
        else
            @current_user = nil
        end
    end

    def logged_in?
        !!current_user
    end

    def require_user
        if !logged_in?
            flash[:danger] = 'You must be logged in'
            redirect_to root_path
        end
    end
end
