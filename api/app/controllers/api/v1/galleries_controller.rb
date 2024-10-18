# frozen_string_literal: true

module Api
  module V1
    class GalleriesController < ApplicationController
      before_action :authorize_request

      def create
        gallery = Gallery.create!(galleries_params)
        if gallery
          render json: {}
        else
          render json: gallery.errors
        end
      end

      def index
        @galleries = Gallery.order(created_at: :desc).paginate(page: params[:page])

        render json: @galleries
      end

      def destroy
        set_gallery
        return unless @gallery.destroy

        render json: {}
      end

      private

      def galleries_params
        params.require(:gallery).permit(:image, :caption, :user_id)
      end

      def set_gallery
        @gallery = Gallery.find(params[:id])
      end
    end
  end
end
