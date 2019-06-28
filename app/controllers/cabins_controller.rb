class CabinsController < ApplicationController
    helper_method :current_user, :logged_in?
    before_action :set_cabin, only: [:update, :show, :edit, :destroy]
    
    def index
        @cabins = Cabin.all
    end

    def new
        @cabin = Cabin.new
    end

    def edit
        set_cabin
    end

    def create
        @cabin = Cabin.new(cabin_params)
        if @cabin.save
            flash[:notice] = "cabin added"
            redirect_to cabins_path
        else
            render 'new'
        end
    end

    def show
        set_cabin
        @date = params[:date] ? Date.parse(params[:date]) : Date.today
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

    def destroy
        set_cabin
        if @cabin.destroy
            flash[:notice] = "cabin deleted"
            redirect_to cabins_path
        else
            flash[:notice] = "something went wrong"
            redirect_to cabins_path
        end
    end

    private

        def cabin_params
            params.require(:cabin).permit(:name, :bedrooms, :image)
        end

        def set_cabin
            @cabin = Cabin.find(params[:id])
        end

end
