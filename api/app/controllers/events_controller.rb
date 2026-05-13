# typed: true
# frozen_string_literal: true

class EventsController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!, only: %i[new create edit update destroy]
  before_action :set_event, only: %i[show edit update destroy]
  before_action :require_owner!, only: %i[edit update destroy]

  def index
    setup_week
    @event = Event.new
  end

  def show; end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params.merge(user_id: current_user.id))
    if @event.save
      redirect_to events_path, notice: 'Event created.'
    else
      setup_week
      render :index, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @event.update(event_params)
      redirect_to events_path, notice: 'Event updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @event.destroy
    redirect_to events_path, notice: 'Event deleted.'
  end

  private

  def setup_week
    @week_start = begin
      params[:week] ? Date.parse(params[:week]) : Date.today.beginning_of_week(:sunday)
    rescue ArgumentError
      Date.today.beginning_of_week(:sunday)
    end
    @week_end  = @week_start + 6.days
    @week_days = (@week_start..@week_end).to_a

    # Fetch all valid events that overlap the displayed week (not just those starting within it)
    events = Event
      .where.not(start_time: nil, end_time: nil)
      .where('start_time <= ? AND end_time >= ?', @week_end.end_of_day, @week_start.beginning_of_day)
      .order(:start_time)

    # Map each event to every day it spans within the week
    @events_by_day = Hash.new { |h, k| h[k] = [] }
    events.each do |event|
      first_day = [event.start_time.to_date, @week_start].max
      last_day  = [event.end_time.to_date, @week_end].min
      (first_day..last_day).each { |day| @events_by_day[day] << event }
    end
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:title, :location, :description, :start_time, :end_time, :all_day)
  end

  def require_owner!
    unless @event.user_id == current_user.id || current_user.admin?
      redirect_to events_path, alert: 'Not authorized.'
    end
  end
end
