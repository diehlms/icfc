class Api::V1::LogsController < ApplicationController
  before_action :check_admin_only

  def index
    logs_file_path = Rails.root.join("log", "#{Rails.env}.log")
    logs = File.readlines(logs_file_path).last(1000).map { |line| line.slice(0, 50) }
    render json: { logs: logs }, status: :ok
  end

  private

  def log_params
    params.permit(:user_id)
  end
end