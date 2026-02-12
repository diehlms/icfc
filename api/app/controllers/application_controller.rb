# frozen_string_literal: true

class ApplicationController < ActionController::Base
  around_action :label_metrics

  private

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

  def check_authorization
    model = instance_variable_get("@#{controller_name.singularize}")
    authorize_resource(model, params[:user_id], false) if model.present?
  end

  def check_admin_only
    render json: { error: 'Not admin user' }, status: :forbidden unless @current_user&.admin?
  end

  def authorize_resource(model, user_id_param, strict)
    return true if @current_user&.admin?

    render json: { error: 'Unauthorized access' }, status: :forbidden unless model.user_id == @current_user.id
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
