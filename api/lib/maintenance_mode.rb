# typed: strict
# frozen_string_literal: true

require 'sorbet-runtime'

class MaintenanceMode
  extend T::Sig

  sig { params(app: T.untyped).void }
  def initialize(app)
    @app = T.let(app, T.untyped)
  end

  sig { params(env: T::Hash[String, T.untyped]).returns(T.untyped) }
  def call(env)
    if maintenance_mode_active?
      rack_response
    else
      @app.call(env)
    end
  end

  private

  sig { returns(T::Boolean) }
  def maintenance_mode_active?
    false
    # ENV.fetch("MAINTENANCE_MODE_ACTIVE", nil)
  end

  sig { returns([Integer, T::Hash[String, String], T::Array[String]]) }
  def rack_response
    # A valid Rack response is a 3-element array: [status, headers, body]
    [503, { 'Content-Type' => 'text/plain' }, ["Site is in maintenance mode. Email diehl if there is something you need :)"]]
  end
end
