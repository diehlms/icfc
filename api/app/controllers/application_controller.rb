# typed: true
# frozen_string_literal: true

class ApplicationController < ActionController::Base
  extend T::Sig

  around_action :label_metrics
  helper_method :current_user, :logged_in?

  private

  sig { returns(T.nilable(User)) }
  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  sig { returns(T::Boolean) }
  def logged_in?
    current_user.present?
  end

  sig { void }
  def authenticate_user!
    redirect_to login_path, alert: 'Please log in to continue.' unless logged_in?
  end

  sig { void }
  def require_verified!
    return if current_user&.verified?

    redirect_to root_path, alert: 'Your account must be verified before you can post content.'
  end

  sig { void }
  def require_admin!
    redirect_to root_path, alert: 'Not authorized.' unless current_user&.admin?
  end

  # JWT-based auth for API controllers
  sig { void }
  def authorize_request
    header = request.headers['Authorization']
    token = header&.split(' ')&.last

    if token
      begin
        @decoded = JsonWebToken.decode(token)
        @current_user = User.find(@decoded[:user_id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: "User not found: #{e.message}" }, status: :unauthorized
      rescue JWT::DecodeError => e
        render json: { errors: "Token decode error: #{e.message}" }, status: :unauthorized
      end
    else
      render json: { errors: 'Missing token' }, status: :unauthorized
    end
  end

  sig { void }
  def check_authorization
    model = instance_variable_get("@#{controller_name.singularize}")
    authorize_resource(model, params[:user_id], false) if model.present?
  end

  sig { void }
  def verify_captcha!
    unless CaptchaService.verify(params[:captcha_token].to_s)
      render json: { error: 'Captcha verification failed' }, status: :unprocessable_entity
    end
  end

  sig { void }
  def check_admin_only
    render json: { error: 'Not admin user' }, status: :forbidden unless @current_user&.admin?
  end

  sig { params(model: T.untyped, _user_id_param: T.untyped, _strict: T::Boolean).void }
  def authorize_resource(model, _user_id_param, _strict)
    return if @current_user&.admin?

    render json: { error: 'Unauthorized access' }, status: :forbidden unless model.user_id == @current_user.id
  end

  sig { params(payload: T::Hash[T.untyped, T.untyped]).void }
  def append_info_to_payload(payload)
    super
    payload[:host] = request.host
    payload[:remote_ip] = request.remote_ip
    payload[:ip] = request.ip
    payload[:user_id] = @current_user&.id || current_user&.id || 'guest'
    payload[:request_id] = request.uuid
  end

  sig { void }
  def label_metrics
    Thread.current['metrics_labels'] = { controller: params[:controller], action: params[:action] }
    yield
  ensure
    Thread.current['metrics_labels'] = nil
  end
end
