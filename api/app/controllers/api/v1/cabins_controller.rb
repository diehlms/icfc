# frozen_string_literal: true

module Api
  module V1
    class CabinsController < ApplicationController
      before_action :authorize_request

      def index
        @cabins = Cabin.all
        render json: @cabins
      end

      def create
        @cabin = Cabin.create!(cabin_params)
        if @cabin
          render json: @cabin
        else
          render json: @cabin.errors
        end
      end

      def show
        return unless cabin

        render json: cabin.to_json(
          include: {
            cabin_attachments: {},
            cabindates: {}
          }
        )
      end

      def update
        if cabin.update(cabin_params)
          render json: { message: 'Cabin updated!', cabin: @cabin }, status: :ok
        else
          render json: { errors: @cabin.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        respond_to do |format|
          if cabin.destroy
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

      def cabin
        @cabin ||= Cabin.includes(:cabin_attachments, :cabindates).find_by_id(params[:id])
      end
    end
  end
end
