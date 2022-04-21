class Api::V1::DocumentsController < ApplicationController
    before_action :require_user
    helper_method :current_user, :logged_in?, :require_user
    
    def index
        @documents = Document.all.where(document_folder: params[:document_folder])
        render json: @documents
    end

    def create
        if current_user.admin?
            @document = Document.create!(documents_params) 
            if @document
                render json: Document.all
            else
                render json: Document.all
            end
        end
    end

    def destroy
        if current_user.admin?
            set_document
            if @document.destroy
                render json: Document.all
            else
                render json: Document.all
            end
        end
    end

    private

    def documents_params
        params.permit(:document, :document_title, :document_folder)
    end

    def set_document
        @document = Document.find(params[:id])
    end
end