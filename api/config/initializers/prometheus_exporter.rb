require 'prometheus_exporter/middleware'
require 'prometheus_exporter/instrumentation'

# Rack middleware to gather request metrics
Rails.application.middleware.unshift PrometheusExporter::Middleware

# Setup default labels and server
PrometheusExporter::Instrumentation::ActiveRecord.start
PrometheusExporter::Instrumentation::Process.start(type: 'web')

