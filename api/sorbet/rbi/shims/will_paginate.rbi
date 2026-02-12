# typed: true

# Shim for will_paginate per_page class accessor
class ActiveRecord::Base
  class << self
    sig { returns(T.nilable(Integer)) }
    def per_page; end

    sig { params(value: Integer).returns(Integer) }
    def per_page=(value); end
  end
end
