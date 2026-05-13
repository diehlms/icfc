# typed: true
# frozen_string_literal: true

class DocumentsController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!
  before_action :require_verified!, only: %i[create destroy]

  def index
    @documents = Document.order(:document_folder, :document_title)
  end

  def create
    require_admin!
    @document = Document.new(document_params)
    back = params[:redirect_to].presence || documents_path
    if @document.save
      redirect_to back, notice: 'Document uploaded.'
    else
      redirect_to back, alert: @document.errors.full_messages.join(', ')
    end
  end

  def destroy
    require_admin!
    @document = Document.find(params[:id])
    back = params[:redirect_to].presence || documents_path
    @document.destroy
    redirect_to back, notice: 'Document deleted.'
  end

  private

  def document_params
    params.require(:document).permit(:document_title, :document_folder, :document)
  end
end
