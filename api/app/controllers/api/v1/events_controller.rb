# frozen_string_literal: true
module Api
    module V1
        class EventsController < ApplicationController
            before_action :set_event, only: %i[show edit update destroy]
            before_action :authorize_request
        
            def index
                @events = Event.all
                @events_by_date = Event.all.group_by(&:start_time)
                @date = params[:date] ? Date.parse(params[:date]) : Date.today
            end
        
            def show; end
        
            def new
                @event = Event.new
            end
        
            def edit; end
        
            def create
                @event = current_user.events.new(event_params)
                respond_to do |format|
                    if @event.save
                        format.json { render :show, status: :ok, location: @event }
                    else
                        format.json { render json: @event.errors, status: :unprocessable_entity }
                    end
                end
            end
        

            def update
                if current_user.admin?
                    set_event
                else
                    @event = current_user.events.find(params[:id])
                end
                respond_to do |format|
                    if @event.update(event_params)
                        format.json { render :show, status: :ok, location: @event }
                    else
                        format.json { render json: @event.errors, status: :unprocessable_entity }
                    end
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
                @event = Event.find_by_id(params[:id])
            end

            def event_params
                params.require(:event).permit(:events, :location, :description, :start_time, :end_time, :user_id)
            end
        end
    end
end