# frozen_string_literal: true

# == Schema Information
#
# Table name: sessions
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# typed: true

class Session < ApplicationRecord
  extend T::Sig
end
