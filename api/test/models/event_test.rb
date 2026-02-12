# == Schema Information
#
# Table name: events
#
#  id          :bigint           not null, primary key
#  all_day     :boolean          default(TRUE)
#  description :string
#  end_time    :datetime
#  location    :string
#  start_time  :datetime
#  title       :string
#  user_id     :integer
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
