# frozen_string_literal: true

# == Schema Information
#
# Table name: documents
#
#  id              :uuid             not null, primary key
#  document        :string
#  document_folder :string
#  document_title  :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# typed: true

class Document < ApplicationRecord
  extend T::Sig

  validates :document_title, length: { maximum: 30, minimum: 5 }, presence: true
  validates :document_folder, length: { maximum: 30, minimum: 5 }, presence: true
  validates :document, presence: true

  mount_uploader :document, DocumentUploader
end
