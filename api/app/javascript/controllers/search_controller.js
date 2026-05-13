import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "results"]

  query() {
    const q = this.inputTarget.value.trim()
    if (q.length < 2) {
      this.clear()
      return
    }
    clearTimeout(this._debounce)
    this._debounce = setTimeout(() => this.fetch(q), 250)
  }

  async fetch(q) {
    const url = `/search?q=${encodeURIComponent(q)}&format=json`
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } })
      if (!res.ok) return
      const data = await res.json()
      this.render(data)
    } catch (_) { /* ignore */ }
  }

  render(data) {
    const results = this.resultsTarget
    const items = [
      ...(data.articles || []).map(a => `<a href="/articles/${a.id}" class="block px-3 py-2 hover:bg-gray-100 text-sm">${a.title}</a>`),
      ...(data.events  || []).map(e => `<a href="/events" class="block px-3 py-2 hover:bg-gray-100 text-sm">${e.title}</a>`),
      ...(data.cabins  || []).map(c => `<a href="/cabins/${c.id}" class="block px-3 py-2 hover:bg-gray-100 text-sm">${c.name}</a>`),
      ...(data.users   || []).map(u => `<a href="/users/${u.id}" class="block px-3 py-2 hover:bg-gray-100 text-sm">${u.firstname} ${u.lastname}</a>`),
    ]
    if (items.length) {
      results.innerHTML = items.join("")
      results.classList.remove("hidden")
    } else {
      results.innerHTML = `<p class="px-3 py-2 text-sm text-gray-500">No results</p>`
      results.classList.remove("hidden")
    }
  }

  clear() {
    this.resultsTarget.classList.add("hidden")
    this.resultsTarget.innerHTML = ""
  }
}
