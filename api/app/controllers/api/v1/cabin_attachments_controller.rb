# frozen_string_literal: true

module Api
  module V1
    class CabinAttachmentsController < ApplicationController
      before_action :authorize_request
      before_action :cabin_attachment, only: %i[destroy]
      before_action :check_authorization, only: %i[destroy]

      def index
        @cabin_attachments = CabinAttachment.find_by(cabin_id: params[:cabin_id])
        render json: @cabin_attachments
      end

      def create
        @cabin_attachment = CabinAttachment.new(cabin_attachment_params)
        if @cabin_attachment.save
          render json: {}
        else
          render json: @cabin_attachment.errors
        end
      end

      def destroy
        @cabin_attachment.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      end

      private

      def cabin_attachment
        @cabin_attachment = CabinAttachment.find(params[:id])
      end

      def cabin_attachment_params
        params.permit(:cabin_id, :image)
      end
    end
  end
end
