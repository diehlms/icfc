# == Schema Information
#
# Table name: cabin_attachments
#
#  id         :bigint           not null, primary key
#  image      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  cabin_id   :integer
#
# Foreign Keys
#
#  fk_rails_...  (cabin_id => cabins.id)
#
require 'test_helper'

class CabinAttachmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
