if Rails.env.test? or Rails.env.development?
    CarrierWave.configure do |config|
      config.storage = :file
      config.root = Rails.root.join('public')
      config.cache_dir = "#{Rails.root}/tmp/images"
    end
  else
    CarrierWave.configure do |config|  
      config.aws_credentials = {
        :aws_access_key_id => ENV['AWS_ACCESS_KEY'],
        :aws_secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'],
        :region => ENV['AWS_S3_REGION']
      }
      config.aws_bucket = ENV['AWS_BUCKET']
      config.storage = :aws
      config.aws_acl = 'private'
    end
  end