class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  helper_method :require_user
  before_action :require_user
  
  # GET /events
  # GET /events.json
  def index
    @events = Event.all
    @events_by_date = Event.all.group_by {|i| i.start_time }
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
  end

  # GET /events/1
  # GET /events/1.json
  def show
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events
  # POST /events.json
  def create
    @event = current_user.events.new(event_params)
      respond_to do |format|
        if @event.save
          flash[:notice] = "Event added"
          format.html { redirect_to events_path }
          format.json { render :show, status: :ok, location: @event}
        else
          flash[:notice] = "Something went wrong with the upload. Please try again."
          format.html { redirect_to new_event_path }
          format.json { render json: @event.errors, status: :unprocessable_entity }
        end
      end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    if current_user.admin?
      set_event
    else
      @event = current_user.events.find(params[:id])
    end
    respond_to do |format|
      if @event.update(event_params)
        flash[:notice] = "Event updated"
        format.html { redirect_to events_path }
        format.json { render :show, status: :ok, location: @event}
      else
        flash[:notice] = "Something went wrong with the upload. Please try again."
        format.html { redirect_to new_event_path }
        format.json { render json: @event.errors, status: :unprocessable_entity}
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find_by_id(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def event_params
      params.require(:event).permit(:events, :location, :description, :start_time, :end_time, :user_id)
    end
end
