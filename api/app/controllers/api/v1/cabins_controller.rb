# frozen_string_literal: true
module Api
    module V1
        class CabinsController < ApplicationController
            before_action :set_cabin, only: %i[update show edit destroy]
            before_action :authorize_request
        
            def index
                @cabins = Cabin.all
            end
        
            def new
                @cabin = current_user.cabins.build
                @cabin_attachment = @cabin.cabin_attachments.build
            end
        
            def edit
                if current_user.admin?
                    set_cabin
                else
                    @cabin = current_user.cabins.find(params[:id])
                end
            end
        
            def create
                @cabin = current_user.cabins.build(cabin_params)
                respond_to do |format|
                    if @cabin.save
                    if params[:cabin_attachments]
                        params[:cabin_attachments]['image'].each do |i|
                        @cabin_attachment = @cabin.cabin_attachments.create!(image: i, cabin_id: @cabin.id)
                        end
                    end
                    format.json { render :show, status: :ok, location: @cabin }
                    else
                    format.json { render json: @cabin.errors, status: :unprocessable_entity }
                    end
                end
            end
        
            def show
                set_cabin
                return unless @cabin
            
                @cabin_attachments = @cabin.cabin_attachments.all
                @cabindate = Cabindate.new(cabin_id: params[:id])
                @cabindates = @cabin.cabindates
            end
        
            def update
                if current_user.admin?
                    set_cabin
                else
                    @cabin = current_user.cabins.find(params[:id])
                end
                respond_to do |format|
                    if @cabin.update(cabin_params)
                    if params[:cabin_attachments]
                        params[:cabin_attachments]['image'].each do |i|
                        @cabin_attachment = @cabin.cabin_attachments.create!(image: i, cabin_id: @cabin.id)
                        end
                    end
                        format.json { render :show, status: :ok, location: @cabin }
                    else
                        format.json { render json: @cabin.errors, status: :unprocessable_entity }
                    end
                end
            end
        
            def destroy
                set_cabin
                respond_to do |format|
                    if @cabin.destroy
                        format.json { head :no_content }
                    else
                        format.json { render :json, @cabin.errors, status: :unprocessable_entity }
                    end
                end
            end
        
            private
        
            def cabin_params
                params.require(:cabin).permit(:name, :bedrooms, :washerdryer, :dock, :user_id, :price_per_week,
                                            :price_per_day, :description, cabin_attachments_attributes: %i[id cabin_id image])
            end
        
            def set_cabin
                @cabin = Cabin.find_by_id(params[:id])
            end
        
            def cabindate_params
                params.require(:cabindate).permit(:startdate, :enddate, :cabin_id)
            end
        end
    end
end