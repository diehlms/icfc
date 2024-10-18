# frozen_string_literal: true

module Api
  module V1
    class EventsController < ApplicationController
      before_action :set_event, only: %i[show edit update destroy]
      before_action :authorize_request

      def index
        @events = Event.includes(:user).all
        @events_by_date = Event.all.group_by(&:start_time)
        @date = params[:date] ? Date.parse(params[:date]) : Date.today

        render json: @events
      end

      def create
        event = Event.create!(event_params)
        if event
          render json: event
        else
          render json: event.errors
        end
      end

      def update
        if @event.update(event_params)
          render json: { message: 'Event updated!', event: @event }, status: :ok
        else
          render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @event.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      end

      private

      def set_event
        @event = Event.includes(:user).find_by_id(params[:id])
      end

      def event_params
        params.require(:event).permit(:events, :location, :description, :start_time, :end_time, :user_id)
      end
    end
  end
end
