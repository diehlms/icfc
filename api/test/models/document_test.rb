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
require 'test_helper'

class DocumentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
