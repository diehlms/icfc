import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dialog"]

  open() {
    this.dialogTarget.showModal()
  }

  close() {
    this.dialogTarget.close()
  }

  // Close when clicking the backdrop (the <dialog> element itself, outside the content)
  backdropClose(event) {
    if (event.target === this.dialogTarget) this.close()
  }
}
