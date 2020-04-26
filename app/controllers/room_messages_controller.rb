class RoomMessagesController < ApplicationController
    before_action :load_entities, only: :create
    helper_method :current_user

    def create
        @room_message = RoomMessage.create user: current_user,
            room: @room,
            message: params.dig(:room_message, :message)
        RoomChannel.broadcast_to @room, @room_message
    end

    def destroy
        @room_message = RoomMessage.find_by_id(params[:id])
        @room = @room_message.room_id.to_s
        if @room_message.destroy
            redirect_to room_path(@room), notice: "Message deleted"
        else
            redirect_to rooms_path, notice: "We had trouble removing that message for you"
        end
    end

    protected

    def load_entities 
        @room = Room.find params.dig(:room_message, :room_id)
    end
end
