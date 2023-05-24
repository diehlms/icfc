class RoomsController < ApplicationController
    helper_method :require_user
    before_action :load_entities, :require_user
    
    def index
        @rooms = Room.all
    end

    def new
        @room = Room.new
    end

    def show
        @room_message = RoomMessage.new room: @room
        @room_messages = @room.room_messages.includes(:user)
    end

    def create
        @room = Room.new permitted_parameters
        if @room.save
            flash[:success] = "Room #{@room.name} was created successfully"
            redirect_to rooms_path
        else
            render :new
        end
    end

    def edit
    end

    def update
        if @room.update(permitted_parameters)
            flash[:success] = "Room #{@room.name} updated successfully"
            redirect_to rooms_path
        else
            render :new
        end
    end

    def destroy
        @room = Room.find(params[:id]) if params[:id]
        respond_to do |format|
            if @room.destroy
                format.html { redirect_to rooms_path, notice: "Room deleted" }
            else
                format.html { redirect_to rooms_path }
            end
        end
    end

    protected
     
        def load_entities
            @rooms = Room.all
            @room = Room.friendly.find(params[:id]) if params[:id]
        end

        def permitted_parameters
            params.require(:room).permit(:name)
        end
end
