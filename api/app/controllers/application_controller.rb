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
    @current_user = User.find(decoded[:user_id]) if decoded
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError
    render json: { errors: 'Unauthorized' }, status: :unauthorized
  end
end
