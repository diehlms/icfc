# typed: true
# frozen_string_literal: true

class CampInfoController < ApplicationController
  extend T::Sig

  before_action :authenticate_user!

  def index; end
  def history; end
  def customs; end
  def membership; end
  def committees
    @committees = Committee.order(:name)
  end
  def bylaws; end
  def charitable_giving; end
  def family_agreements; end
  def planned_giving; end
  def forms
    @documents = Document.where(document_folder: 'forms').order(:document_title)
  end

  def archives
    @document_groups = Document
      .where(document_folder: %w[dailyBilges backBayBilges])
      .order(:document_folder, :document_title)
      .group_by(&:document_folder)
  end
end
