Rails.application.configure do
  config.lograge.enabled = true  # Enable lograge

  # Use a JSON formatter for Lograge
  config.lograge.formatter = Lograge::Formatters::Json.new

  # Customize what is logged
  config.lograge.custom_options = lambda do |event|
    # Extract custom options that you might want to log
    {
      time: event.time,
      host: event.payload[:host],
      remote_ip: event.payload[:remote_ip],
      user_id: event.payload[:user_id],
      request_id: event.payload[:request_id]
    }
  end
end
