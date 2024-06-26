# frozen_string_literal: true

class DocumentUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  if Rails.env.production?
    storage :aws
  else
    storage :file
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.document_folder}/#{model.id}"
  end

  def extension_white_list
    %w[pdf docx html htm doc]
  end
end
