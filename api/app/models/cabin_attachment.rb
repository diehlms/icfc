# typed: strict
# frozen_string_literal: true

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

class CabinAttachment < ApplicationRecord
  extend T::Sig

  belongs_to :cabin
  mount_uploader :image, ImageUploader
end
