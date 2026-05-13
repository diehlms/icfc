# typed: true
# frozen_string_literal: true

class LogFormatter < Logger::Formatter
  extend T::Sig

  sig { params(severity: String, _time: Time, program_name: T.nilable(String), message: T.untyped).returns(String) }
  def call(severity, _time, program_name, message)
    message = '' if message.blank?
    severity = '' if message.blank?

    {
      level: severity,
      progname: program_name,
      message:
    }.to_json + "\r\n"
  end
end
