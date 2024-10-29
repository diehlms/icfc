# frozen_string_literal: true

module Api
  module V1
    class GalleriesController < ApplicationController
      before_action :authorize_request
      before_action :gallery, only: %i[destroy]
      before_action :check_authorization, only: %i[destroy]

      def index
        @galleries = Gallery.order(created_at: :desc).paginate(page: params[:page])

        render json: @galleries, each_serializer: GallerySerializer
      end

      def create
        @gallery = Gallery.create!(galleries_params)
        if @gallery
          render json: {}
        else
          render json: @gallery.errors
        end
      end

      def destroy
        render json: {} if gallery.destroy
      end

      private

      def galleries_params
        params.require(:gallery).permit(:image, :caption, :user_id)
      end

      def gallery
        @gallery = Gallery.find(params[:id])
      end
    end
  end
end
