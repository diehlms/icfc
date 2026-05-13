# == Schema Information
#
# Table name: galleries
#
#  id         :bigint           not null, primary key
#  caption    :string
#  image      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'test_helper'

class GalleryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
