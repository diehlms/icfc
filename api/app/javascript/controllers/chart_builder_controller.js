import { Controller } from "@hotwired/stimulus"
import * as L from "leaflet"

export default class extends Controller {
  static targets = ["map", "caption"]

  get L() {
    return L.default || L || window.L
  }

  connect() {
    this.points = []
    this.markers = []
    this.polyline = null

    this.initializeMap()
  }

  initializeMap() {
    // Center of Sparrow Lake
    const center = [44.8143, -79.3872]

    this.map = this.L.map(this.mapTarget).setView(center, 14)

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    this.map.on('click', (e) => this.addPoint(e.latlng))
  }

  addPoint(latlng) {
    this.points.push(latlng)

    const marker = this.L.circleMarker(latlng, {
      radius: 5,
      fillColor: "#059669",
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(this.map)

    this.markers.push(marker)
    this.updatePolyline()
  }

  updatePolyline() {
    if (this.polyline) {
      this.map.removeLayer(this.polyline)
    }

    if (this.points.length > 1) {
      this.polyline = this.L.polyline(this.points, {
        color: '#059669',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10'
      }).addTo(this.map)
    }
  }

  undo() {
    if (this.points.length === 0) return

    this.points.pop()
    const lastMarker = this.markers.pop()
    if (lastMarker) this.map.removeLayer(lastMarker)
    
    this.updatePolyline()
  }

  clear() {
    this.points = []
    this.markers.forEach(m => this.map.removeLayer(m))
    this.markers = []
    if (this.polyline) {
      this.map.removeLayer(this.polyline)
      this.polyline = null
    }
  }

  async save() {
    if (this.points.length < 2) {
      alert("Please add at least two points to your chart.")
      return
    }

    const caption = this.captionTarget.value.trim()
    if (!caption) {
      alert("Please enter a caption for your chart.")
      return
    }

    const gpxContent = this.generateGPX()
    const blob = new Blob([gpxContent], { type: 'application/gpx+xml' })
    const file = new File([blob], `${caption.replace(/\s+/g, '_')}.gpx`, { type: 'application/gpx+xml' })

    const formData = new FormData()
    formData.append('chart[caption]', caption)
    formData.append('chart[chart]', file)

    const csrfToken = document.querySelector('meta[name="csrf-token"]').content

    try {
      const response = await fetch('/charts', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken,
          'Accept': 'application/json'
        },
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        window.location.href = data.redirect_url
      } else {
        alert(`Error: ${data.errors.join(', ')}`)
      }
    } catch (error) {
      console.error("Save failed:", error)
      alert("An unexpected error occurred while saving.")
    }
  }

  generateGPX() {
    const pointsXml = this.points.map(p => 
      `      <trkpt lat="${p.lat.toFixed(6)}" lon="${p.lng.toFixed(6)}"></trkpt>`
    ).join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="ICFC Chart Builder" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>${this.captionTarget.value}</name>
    <trkseg>
${pointsXml}
    </trkseg>
  </trk>
</gpx>`
  }

  disconnect() {
    if (this.map) {
      this.map.remove()
    }
  }
}
