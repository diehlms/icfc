class GalleriesController < ApplicationController

    def new
        @gallery = Gallery.new
    end

    def create
        @gallery = Gallery.new(galleries_params)
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
        @galleries = Gallery.all
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
