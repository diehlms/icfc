# frozen_string_literal: true

module Api
  module V1
    class CommitteesController < ApplicationController
      before_action :authorize_request

      def index
        committee = Committee.all
        render json: committee
      end

      def create
        @committee = Committee.create!(committees_params)
        render json: Committee.all
      end

      def destroy
        set_committee
        render json: Committee.all
      end

      private

      def committees_params
        params.permit(:url, :name, :committee)
      end

      def set_committee
        @committee = Committee.find(params[:id])
      end
    end
  end
end
