# typed: true

# Shim for CarrierWave mount_uploader class method
class ActiveRecord::Base
  class << self
    sig { params(column: Symbol, uploader: T.class_of(CarrierWave::Uploader::Base), options: T.untyped).void }
    def mount_uploader(column, uploader, **options); end
  end
end
