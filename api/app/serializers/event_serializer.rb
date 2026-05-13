# frozen_string_literal: true

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
# typed: true

class EventSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :title,
             :location,
             :start_time,
             :end_time,
             :description,
             :id,
             :all_day

  belongs_to :user, serializer: UserSerializer
end
