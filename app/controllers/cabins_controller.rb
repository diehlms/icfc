class CabinsController < ApplicationController
    before_action :set_cabin, only: [:edit, :update, :show, :destroy]
    helper_method :current_user, :logged_in?
    
    def index
        @cabins = Cabin.all
    end

    def new
        @cabin = Cabin.new
    end

    def create
        @cabin= Cabin.new(cabin_params)
        if @cabin.save
            redirect_to cabin_path(@cabin), notice: "Cabin created"
        else
            render 'new'
        end
    end

    def show
        set_cabin
    end

    def delete
        set_cabin
        if @cabin.destroy
            flash[:notice] = "cabin deleted"
            redirect_to cabins_path
        else
            flash[:notice] = "something went wrong"
            redirect_to cabins_path
        end
    end

    def update
        set_cabin
        if @cabin.update
            flash[:notice] = "cabin updated"
            redirect_to cabins_path
        else
            flash[:notice] = "something went wrong"
            redirect_to cabins_path
        end
    end

    def edit
        set_cabin
    end

    private

        def set_cabin
            @cabin = Cabin.find(params[:id])
        end

        def cabin_params
            @cabin.require(:cabin).permit(:name, :bedrooms, :image)
        end
end
