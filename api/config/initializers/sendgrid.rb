# frozen_string_literal: true

require 'sendgrid-ruby'
include SendGrid

ActionMailer::Base.smtp_settings = {
  user_name: 'apikey',
  password: ENV.fetch('SENDGRID_API_KEY', nil),
  domain: 'icfc.net',
  address: 'smtp.sendgrid.net',
  port: 587,
  authentication: :plain,
  enable_starttls_auto: true
}

ActionMailer::Base.delivery_method = :smtp
