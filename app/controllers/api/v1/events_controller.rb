class Api::V1::EventsController < ApplicationController
    def index
        event = Event.all 
        render json: event unless !logged_in?
    end

    def create
        event = Event.create!(event_params) unless !logged_in?
        if event
            render json: event
        else
            render json: event.errors
        end
    end

    def show
        if event
            render json: event unless !logged_in?
        else
            render json: event.errors
        end
    end

    def destroy
        event&.destroy unless !logged_in?
        render json: { message: 'Post deleted!'}
    end

    private

    def event_params
        params.require(:event).permit(:events, :description, :location,  :start_time, :end_time, :user_id, :search)
    end

    def event
        @event ||= Event.find(params[:id])
    end
end