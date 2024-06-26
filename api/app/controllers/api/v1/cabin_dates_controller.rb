# frozen_string_literal: true

module Api
    module V1
        class CabindatesController < ApplicationController
            before_action :authorize_request
        
            def new
                @cabindate = Cabindate.new(cabin_id: params[:cabin_id])
                @cabin = Cabin.find(params[:cabin_id])
            end
        
            def index
                @cabindate = Cabindate.all
            end
        
            def show
                @cabindates = @cabin.cabindates
            end
        
            def destroy
                set_cabindate
                # redirect_back(fallback_location: root_path)
            end
        
            def create
                @cabindate = Cabindate.new(cabindate_params)
                @cabinid = params[:id]
                # redirect_back(fallback_location: root_path)
            end
        
            private
        
            def set_cabindate
                @cabindate = Cabindate.find(params[:id])
            end
        
            def cabindate_params
                params.require(:cabindate).permit(:startdate, :enddate, :cabin_id)
            end
        end
    end
end