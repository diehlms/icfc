import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]

  toggle(event) {
    const input = this.inputTarget
    const btn = event.currentTarget
    const isPassword = input.type === "password"
    input.type = isPassword ? "text" : "password"
    btn.textContent = isPassword ? "Hide" : "Show"
  }
}
