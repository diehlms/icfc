# -*- encoding: utf-8 -*-
# stub: exception_handler 0.8.0.2 ruby lib

Gem::Specification.new do |s|
  s.name = "exception_handler".freeze
  s.version = "0.8.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["R.Peck".freeze]
  s.date = "2021-05-28"
  s.description = "Rails gem to create custom error pages. Captures exceptions using \"exception_app\" callback, routing to \"Exception\" controller, rendering the view as required.".freeze
  s.email = ["rpeck@fl.co.uk".freeze]
  s.homepage = "https://github.com/richpeck/exception_handler".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.1.0".freeze)
  s.rubygems_version = "3.4.10".freeze
  s.summary = "Rails gem to show custom error pages in production. Also logs errors in db & sends notification emails".freeze

  s.installed_by_version = "3.4.10" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<bundler>.freeze, [">= 0"])
  s.add_runtime_dependency(%q<rails>.freeze, [">= 4.2.0"])
  s.add_runtime_dependency(%q<responders>.freeze, [">= 0"])
  s.add_development_dependency(%q<autoprefixer-rails>.freeze, [">= 0"])
  s.add_development_dependency(%q<rake>.freeze, [">= 0"])
  s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
  s.add_development_dependency(%q<rspec-rails>.freeze, [">= 0"])
  s.add_development_dependency(%q<coveralls>.freeze, [">= 0"])
  s.add_development_dependency(%q<sqlite3>.freeze, [">= 1.3.10"])
end
