# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'noreply@icfc.net'
  layout 'mailer'
end
