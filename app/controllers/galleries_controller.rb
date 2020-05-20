class GalleriesController < ApplicationController
    helper_method :require_user
    before_action :require_user
    
    def new
        @gallery = current_user.galleries.build
    end

    def create
        @gallery = current_user.galleries.new(galleries_params)
        if @gallery.save
            flash[:notice] = "image added!"
            redirect_to galleries_path
        else
            flash[:notice] = "something went wrong with image upload"
            redirect_to galleries_path
        end
    end

    def index
        @gallery = Gallery.new
        @galleries = Gallery.paginate(page: params[:page])
    end

    def destroy
        set_gallery
        if @gallery.destroy
            flash[:notice] = "image deleted"
            redirect_to galleries_path
        else
            flash[:notice] = "something went wrong with image removal"
            redirect_to galleries_path
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
