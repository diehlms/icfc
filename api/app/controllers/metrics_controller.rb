class MetricsController < ActionController::Base
  def index
    render plain: PrometheusExporter::Metric::NamespacedRegistry.new('icfc').generate
  end
end
