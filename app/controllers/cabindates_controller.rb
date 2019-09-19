class CabindatesController < ApplicationController
    
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
        if @cabindate.destroy
            flash[:notice] = "dates deleted"
            redirect_back(fallback_location: root_path)
        else
            flash[:notice] = "something went wrong"
            redirect_back(fallback_location: root_path)
        end
    end

    def create
        @cabindate = Cabindate.new(cabindate_params)
        @cabinid = params[:id]
        if @cabindate.save
            flash[:notice] = "date added"
            redirect_back(fallback_location: root_path)
        else
            render 'new'
            redirect_back(fallback_location: root_path)
        end
    end

    private 

        def set_cabindate
            @cabindate = Cabindate.find(params[:id])
        end

        def cabindate_params
            params.require(:cabindate).permit(:startdate, :enddate, :cabin_id)
        end
end
