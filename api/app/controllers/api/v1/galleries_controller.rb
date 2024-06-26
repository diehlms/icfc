# frozen_string_literal: true

module Api
    module V1
        class GalleriesController < ApplicationController
            before_action :authorize_request

            helper_method :require_user
            before_action :require_user
        
            def new
                @gallery = current_user.galleries.build
            end
        
            def create
                @gallery = current_user.galleries.new(galleries_params)
                if @gallery.save
                    render json: { }
                end
            end
        
            def index
                @gallery = Gallery.new
                @galleries = Gallery.paginate(page: params[:page])
            end
        
            def destroy
                set_gallery
                if @gallery.destroy
                    render json: { }
                end
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