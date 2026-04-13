# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin '@hotwired/stimulus', to: 'stimulus.min.js', preload: true
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js', preload: true
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin 'd3', to: 'https://cdn.jsdelivr.net/npm/d3@7/+esm'
pin 'lexxy', to: 'lexxy.js'
pin '@rails/activestorage', to: 'activestorage.esm.js'
pin "leaflet", to: "https://ga.jspm.io/npm:leaflet@1.9.4/dist/leaflet-src.esm.js"