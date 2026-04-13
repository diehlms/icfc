import { Controller } from "@hotwired/stimulus"

// Lightweight rich-text editor using execCommand (sufficient for basic formatting).
// For a full Trix integration, swap the area for an <trix-editor> + <input type="hidden">.
export default class extends Controller {
  static targets = ["area", "input"]

  connect() {
    // Sync contenteditable → hidden input on every change
    this.areaTarget.addEventListener("input", () => this.sync())
    this.sync()
  }

  sync() {
    this.inputTarget.value = this.areaTarget.innerHTML
  }

  bold()       { document.execCommand("bold") }
  italic()     { document.execCommand("italic") }
  heading()    { document.execCommand("formatBlock", false, "h2") }
  bulletList() { document.execCommand("insertUnorderedList") }
}
