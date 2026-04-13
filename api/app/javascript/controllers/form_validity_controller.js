import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["submit"]

  connect() {
    this.refresh = this.refresh.bind(this)
    this.element.addEventListener("input", this.refresh)
    this.element.addEventListener("change", this.refresh)
    this.refresh()
  }

  disconnect() {
    this.element.removeEventListener("input", this.refresh)
    this.element.removeEventListener("change", this.refresh)
  }

  refresh() {
    const valid = this.element.checkValidity()

    this.submitTargets.forEach((button) => {
      button.disabled = !valid
      button.classList.toggle("opacity-50", !valid)
      button.classList.toggle("cursor-not-allowed", !valid)
    })
  }
}
