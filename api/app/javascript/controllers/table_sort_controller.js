import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["table"]

  connect() {
    this.sortCol = null
    this.sortAsc = true
    this.tableTarget.querySelectorAll("thead th[data-sortable]").forEach((th, i) => {
      th.style.cursor = "pointer"
      th.dataset.colIndex = i
      th.addEventListener("click", () => this.sort(th))
    })
  }

  sort(th) {
    const col = parseInt(th.dataset.colIndex)
    if (this.sortCol === col) {
      this.sortAsc = !this.sortAsc
    } else {
      this.sortCol = col
      this.sortAsc = true
    }

    const tbody = this.tableTarget.querySelector("tbody")
    const rows = Array.from(tbody.querySelectorAll("tr"))

    rows.sort((a, b) => {
      const aText = a.cells[col]?.textContent.trim().toLowerCase() ?? ""
      const bText = b.cells[col]?.textContent.trim().toLowerCase() ?? ""
      const aNum = parseFloat(aText.replace(/[^0-9.-]/g, ""))
      const bNum = parseFloat(bText.replace(/[^0-9.-]/g, ""))
      const numeric = !isNaN(aNum) && !isNaN(bNum)
      const cmp = numeric ? aNum - bNum : aText.localeCompare(bText)
      return this.sortAsc ? cmp : -cmp
    })

    rows.forEach(row => tbody.appendChild(row))

    this.tableTarget.querySelectorAll("thead th[data-sortable]").forEach(header => {
      const indicator = header.querySelector(".sort-indicator")
      if (indicator) indicator.remove()
    })

    const indicator = document.createElement("span")
    indicator.className = "sort-indicator ml-1 text-emerald-600"
    indicator.textContent = this.sortAsc ? "↑" : "↓"
    th.appendChild(indicator)
  }
}
