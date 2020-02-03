class Api::V1::EventsController < ApplicationController
    def index
        event = Event.all
        render json: event
    end

    def create
        event = Event.create!(event_params)
        if event
            render json: event
        else
            render json: event.errors
        end
    end

    def show
        if event
            render json: event
        else
            render json: event.errors
        end
    end

    def destroy
        event&.destroy
        render json: { message: 'Post deleted!'}
    end

    # def edit
    # end

    # def update
    # end

    private

    def event_params
        params.require(:event).permit(:events, :content, :pinned, :user_id, :search)
    end

    def event
        @event ||= Event.find(params[:id])
    end
end