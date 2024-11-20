# frozen_string_literal: true

module Api
  module V1
    class EventsController < ApplicationController
      before_action :authorize_request
      before_action :event, only: %i[show update destroy]
      before_action :check_authorization, only: %i[update destroy]

      def index
        @events = Event.all
        render json: @events, each_serializer: EventSerializer
      end

      def show
        return unless event

        render json: event, serializer: EventSerializer
      end

      def create
        @event = Event.new(event_params)
        if @event.save
          render json: @event
        else
          render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if event.update(event_params)
          render json: { message: 'Event updated!', event: }, status: :ok
        else
          render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        event.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      end

      private

      def event
        @event = Event.find_by_id(params[:id])
      end

      def event_params
        params.require(:event).permit(:events, :location, :description, :start_time, :end_time, :user_id)
      end
    end
  end
end
