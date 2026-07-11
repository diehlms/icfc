import { Controller } from "@hotwired/stimulus"

const RULES = [
  { key: "length",    label: "At least 8 characters",        test: v => v.length >= 8 },
  { key: "lowercase", label: "At least one lowercase letter", test: v => /[a-z]/.test(v) },
  { key: "uppercase", label: "At least one uppercase letter", test: v => /[A-Z]/.test(v) },
  { key: "number",    label: "At least one number",           test: v => /\d/.test(v) },
]

export default class extends Controller {
  static targets = ["input", "rules"]

  connect() {
    this.rulesTarget.innerHTML = RULES.map(r =>
      `<li data-rule="${r.key}" class="flex items-center gap-1.5 text-gray-400">
        <span data-icon>○</span> ${r.label}
      </li>`
    ).join("")
  }

  check() {
    const val = this.inputTarget.value
    RULES.forEach(({ key, test }) => {
      const li = this.rulesTarget.querySelector(`[data-rule="${key}"]`)
      if (!li) return
      const met = test(val)
      li.classList.toggle("text-green-600", met)
      li.classList.toggle("text-gray-400", !met)
      li.querySelector("[data-icon]").textContent = met ? "✓" : "○"
    })
  }
}
