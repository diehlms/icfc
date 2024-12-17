class MaintenanceMode
  def initialize(app)
    @app = app
  end

  def call(env)
    if maintenance_mode_active?
      rack_response
    else
      @app.call(env)
    end
  end

  private

  def maintenance_mode_active?
    ENV.fetch("MAINTENANCE_MODE_ACTIVE", nil)
  end

  def rack_response
    # A valid Rack response is a 3-element array: [status, headers, body]
    [503, { 'Content-Type' => 'text/plain' }, ["Site is in maintenance mode. Email diehl if there is something you need :)"]]
  end
end