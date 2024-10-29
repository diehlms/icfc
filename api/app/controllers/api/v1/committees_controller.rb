# frozen_string_literal: true

module Api
  module V1
    class CommitteesController < ApplicationController
      before_action :authorize_request
      before_action :committee, only: %i[destroy]
      before_action :check_authorization, only: %i[destroy]

      def index
        committee = Committee.all
        render json: committee
      end

      def create
        @committee = Committee.create!(committees_params)
        render json: @committee
      end

      def destroy
        return unless committee&.destroy

        render json: {}
      end

      private

      def committees_params
        params.permit(:url, :name, :committee)
      end

      def committee
        @committee = Committee.find(params[:id])
      end
    end
  end
end
