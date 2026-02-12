# typed: true
# frozen_string_literal: true

class DocumentUploader < CarrierWave::Uploader::Base
  extend T::Sig

  include CarrierWave::MiniMagick

  if Rails.env.production? || Rails.env.staging?
    storage :aws
  else
    storage :file
  end

  sig { returns(String) }
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.document_folder}/#{model.id}"
  end

  sig { returns(T::Array[String]) }
  def extension_white_list
    %w[pdf docx html htm doc]
  end
end
