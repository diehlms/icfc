class CabinAttachmentsController < ApplicationController
  before_action :set_cabin_attachment, only: [:show, :edit, :update, :destroy]

  def index
    @cabin_attachments = CabinAttachment.all
  end

  def show
  end

  def new
    @cabin_attachment = CabinAttachment.new
  end

  def edit
  end

  def create
    @cabin_attachment = CabinAttachment.new(cabin_attachment_params)

    respond_to do |format|
      if @cabin_attachment.save
        format.html { redirect_to @cabin_attachment, notice: 'Cabin attachment was successfully created.' }
        format.json { render :show, status: :created, location: @cabin_attachment }
      else
        format.html { render :new }
        format.json { render json: @cabin_attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @cabin_attachment.update(cabin_attachment_params)
        format.html { redirect_to @cabin_attachment, notice: 'Cabin attachment was successfully updated.' }
        format.json { render :show, status: :ok, location: @cabin_attachment }
      else
        format.html { render :edit }
        format.json { render json: @cabin_attachment.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @cabin_attachment.destroy
    respond_to do |format|
      format.html { redirect_to cabin_attachments_url, notice: 'Cabin attachment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_cabin_attachment
      @cabin_attachment = CabinAttachment.find(params[:id])
    end

    def cabin_attachment_params
      params.require(:cabin_attachment).permit(:cabin_id, :image)
    end
end
