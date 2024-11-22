# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # protect_from_forgery
  around_action :label_metrics

  def authorize_request
    header = request.headers['Authorization']

    if header.present?
      token = header.split(' ').last

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

  def check_authorization
    model = instance_variable_get("@#{controller_name.singularize}")
    authorize_resource(model, params[:user_id], false) if model.present?
  end

  def check_admin_only
    model = instance_variable_get("@#{controller_name.singularize}")

    if model.present?
      authorize_resource(model, params[:user_id], true)
    else
      user = User.find_by(id: params[:user_id])
      if user&.admin?
        true
      else
        render json: { error: 'Not admin user' }, status: :forbidden
        false
      end
    end
  end

  def authorize_resource(model, user_id_param, strict)
    user = User.find_by(id: user_id_param)
    logger.warn 'User ID not found in params' if user_id_param.nil?

    if (!strict && user&.admin?) || user&.admin? || (model.respond_to?(:user_id) && model.user_id == user_id_param.to_i)
      true
    else
      render json: { error: 'Unauthorized access' }, status: :forbidden
      false
    end
  end

  def append_info_to_payload(payload)
    super
    payload[:host] = request.host
    payload[:remote_ip] = request.remote_ip
    payload[:ip] = request.ip
    payload[:user_id] = @current_user&.id || 'guest' # Add user context if available
    payload[:request_id] = request.uuid # Add request ID for traceability
  end

  private

  def label_metrics
    Thread.current['metrics_labels'] = { controller: params[:controller], action: params[:action] }
    yield # call the action
  ensure
    # reset to nil so nothing else can access it
    Thread.current['metrics_labels'] = nil
  end
end
