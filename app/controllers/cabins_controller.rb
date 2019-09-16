class CabinsController < ApplicationController
    helper_method :current_user, :logged_in?
    before_action :set_cabin, only: [:update, :show, :edit, :destroy]
    
    def index
        @cabins = Cabin.all
    end

    def new
        @cabin = current_user.cabins.build
        @cabin_attachment = @cabin.cabin_attachments.build
    end

    def edit
        set_cabin
    end

    def create
        @cabin = current_user.cabins.build(cabin_params)
        if @cabin.save
            if params[:cabin_attachments]
                params[:cabin_attachments]['image'].each do |i|
                    @cabin_attachment = @cabin.cabin_attachments.create!(:image => i, :cabin_id => @cabin.id)
                end
            end
            flash[:notice] = "cabin added"
            redirect_to cabins_path
        else
            flash[:notice] = "Something went wrong with the upload. Please try again."
            render 'new'
        end
    end

    def show
        set_cabin
        @cabin_attachments = @cabin.cabin_attachments.all
        @cabindate = Cabindate.new(cabin_id: params[:id])
        @cabindates = @cabin.cabindates
    end

    def update
        set_cabin
        if @cabin.update(cabin_params)
            if params[:cabin_attachments]
                params[:cabin_attachments]['image'].each do |i|
                    @cabin_attachment = @cabin.cabin_attachments.create!(:image => i, :cabin_id => @cabin.id)
                end
            end
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
            params.require(:cabin).permit(:name, :bedrooms, :washerdryer, :dock, :user_id, :price_per_week, :price_per_day, :description, cabin_attachments_attributes: [:id, :cabin_id, :image])
        end

        def set_cabin
            @cabin = Cabin.find(params[:id])
        end

        def cabindate_params
            params.require(:cabindate).permit(:startdate, :enddate, :cabin_id)
        end
end
