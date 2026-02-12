# frozen_string_literal: true

if Rails.env.test? || Rails.env.development?
  CarrierWave.configure do |config|
    config.storage = :file
    config.root = Rails.root.join('public')
    config.cache_dir = "#{Rails.root}/tmp/images"
  end
else
  CarrierWave.configure do |config|
    config.aws_credentials = {
      access_key_id: ENV.fetch('AWS_ACCESS_KEY_ID'),
      secret_access_key: ENV.fetch('AWS_SECRET_ACCESS_KEY'),
      region: ENV.fetch('AWS_S3_REGION')
    }
    config.aws_bucket = ENV.fetch('AWS_BUCKET')
    config.storage = :aws
    config.aws_acl = 'private'
  end
end
