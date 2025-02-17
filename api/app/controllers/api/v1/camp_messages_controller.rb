# frozen_string_literal: true

module Api
  module V1
    class CampMessagesController < ApplicationController
      before_action :authorize_request
      before_action :camp_message, only: %i[destroy]
      before_action :check_admin_only, only: %i[create destroy]

      def index
        @camp_messages = CampMessage.paginate(page: params[:page], per_page: 3).order(created_at: :desc)
        render json: @camp_messages, each_serializer: CampMessageSerializer
      end

      def create
        @camp_message = CampMessage.new(camp_message_params)
        if @camp_message.save
          render json: @camp_message
        else
          render json: { errors: @camp_message.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        camp_message.expired = !camp_message.expired
        if camp_message.save!
          render json: { message: 'Camp message expired!' }
        else
          render json: { errors: @camp_message.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def camp_message_params
        params.require(:camp_message).permit(:message, :user_id)
      end

      def camp_message
        @camp_message ||= CampMessage.find(params[:id])
      end
    end
  end
end
