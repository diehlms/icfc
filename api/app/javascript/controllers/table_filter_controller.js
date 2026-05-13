import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "table"]

  filter() {
    const q = this.inputTarget.value.toLowerCase()
    const rows = this.tableTarget.querySelectorAll("tbody tr")
    rows.forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none"
    })
  }
}
