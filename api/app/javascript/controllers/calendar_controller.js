import { Controller } from "@hotwired/stimulus"

// Basic calendar rendering using the native calendar approach.
// Renders events in a simple list grouped by week for now.
// A full-featured calendar can be added by importing a JS calendar library via importmap.
export default class extends Controller {
  static values = { events: Array }

  connect() {
    this.render()
  }

  render() {
    const events = this.eventsValue
    if (!events.length) {
      this.element.innerHTML = '<p class="text-gray-500 text-sm p-4">No events to display.</p>'
      return
    }

    const grouped = {}
    events.forEach(ev => {
      const date = new Date(ev.start).toLocaleDateString("en-CA")
      if (!grouped[date]) grouped[date] = []
      grouped[date].push(ev)
    })

    const html = Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, evs]) => {
        const d = new Date(date + "T00:00:00")
        const label = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
        const items = evs.map(e => `<li class="text-sm text-gray-700">${e.title}</li>`).join("")
        return `<div class="mb-3"><p class="text-xs font-semibold text-emerald-800 uppercase mb-1">${label}</p><ul class="list-disc list-inside">${items}</ul></div>`
      })
      .join("")

    this.element.innerHTML = html
  }
}
