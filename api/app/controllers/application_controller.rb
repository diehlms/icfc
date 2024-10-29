# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper_method :logged_in?, :current_user, :validate_user
  include SessionsHelper

  def login!
    session[:user_id] = @user.id
  end

  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user&.authenticated?(cookies[:remember_token])
        session[:user_id] = user.id
        @current_user = user
      end
    end
  end

  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  def logged_in?
    !!current_user
  end

  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  def require_user
    return if logged_in?

    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    decoded = JsonWebToken.decode(header)
    puts(decoded)
    @current_user = User.find(decoded[:user_id]) if decoded
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError
    render json: { errors: 'Unauthorized' }, status: :unauthorized
  end

  def check_authorization
    # Assuming you have a method to fetch the current model resource
    model = instance_variable_get("@#{controller_name.singularize}")

    # Pass the model and user_id parameter to the authorization method
    authorize_resource(model, params[:user_id]) if model.present?
  end

  def authorize_resource(model, user_id_param)
    # Find the user by ID or assume admin status if found
    user = User.find_by(id: user_id_param)

    # Return true if user is admin or user is the creator of the model
    if user&.admin? || model.user_id == user_id_param.to_i
      true
    else
      # If unauthorized, respond with an error or redirect as needed
      render json: { error: 'Unauthorized access' }, status: :forbidden
      false
    end
  end
end
