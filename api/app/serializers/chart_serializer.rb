# frozen_string_literal: true

# == Schema Information
#
# Table name: charts
#
#  id         :bigint           not null, primary key
#  caption    :string
#  chart      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# typed: true

class ChartSerializer < ActiveModel::Serializer
  extend T::Sig

  attributes :id, :chart, :caption, :created_at, :updated_at
  belongs_to :user, serializer: UserSerializer
end
