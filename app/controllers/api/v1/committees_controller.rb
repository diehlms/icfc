class Api::V1::CommitteesController < ApplicationController
    before_action :require_user
    helper_method :current_user, :logged_in?, :require_user
    
    def index
        committee = Committee.all
        render json: committee
    end

    def create
        @committee = Committee.create!(committees_params) 
        if @committee
            render json: Committee.all
        else
            render json: Committee.all
        end
    end

    def destroy
        set_committee
        if @committee.destroy
            render json: Committee.all
        else
            render json: Committee.all
        end
    end

    private

    def committees_params
        params.permit(:url, :name, :committee)
    end

    def set_committee
        @committee = Committee.find(params[:id])
    end
end