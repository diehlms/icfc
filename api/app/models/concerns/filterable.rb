# typed: true
# frozen_string_literal: true

module Filterable
  extend ActiveSupport::Concern

  module ClassMethods
    extend T::Sig

    sig { params(filtering_params: T::Hash[T.untyped, T.untyped]).returns(T.untyped) }
    def filter(filtering_params)
      results = T.unsafe(self).where(nil)
      filtering_params.each do |key, value|
        results = results.public_send(key, value) if value.present?
      end
      results
    end
  end
end
