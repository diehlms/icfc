# frozen_string_literal: true

module Api
  module V1
    class DocumentsController < ApplicationController
      before_action :authorize_request
      before_action :document, only: %i[destroy]
      before_action :check_authorization, only: %i[create destroy]

      def index
        @documents = Document.all
        render json: @documents
      end

      def create
        @document = Document.new(documents_params)
        if @document.save
          render json: {}
        else
          render json: {
            errors: @document.errors.full_messages
          }, status: :bad_request
        end
      end

      def destroy
        document
        return unless document&.destroy

        render json: {}
      end

      private

      def documents_params
        params.permit(:document, :document_title, :document_folder)
      end

      def document
        @document = Document.find(params[:id])
      end
    end
  end
end
