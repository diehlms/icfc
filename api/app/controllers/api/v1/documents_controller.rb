# frozen_string_literal: true

module Api
  module V1
    class DocumentsController < ApplicationController
      before_action :authorize_request

      def index
        @documents = Document.all.where(document_folder: params[:document_folder])
        render json: @documents
      end

      def create
        return unless current_user.admin?

        @document = Document.create(documents_params)
        if @document.save
          render json: Document.all
        else
          render json: {
            errors: @document.errors.full_messages
          }, status: :bad_request
        end
      end

      def destroy
        return unless current_user.admin?

        set_document
        render json: Document.all
      end

      private

      def documents_params
        params.permit(:document, :document_title, :document_folder)
      end

      def set_document
        @document = Document.find(params[:id])
      end
    end
  end
end
