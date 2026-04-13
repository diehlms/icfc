import { Controller } from "@hotwired/stimulus"
import * as d3 from "d3"

const NODE_W = 150
const NODE_H = 60
const COLORS = {
  father: "#065f46", mother: "#0f766e",
  son: "#0369a1", daughter: "#7c3aed",
  brother: "#1d4ed8", sister: "#be185d"
}

export default class extends Controller {
  static targets = ["canvas", "panel", "panelName", "panelRelationship", "panelDob", "editLink", "deleteForm", "linkHint"]
  static values  = { members: Array, familyTreeId: Number, membersUrl: String }

  // Linking state
  _linkMode = false
  _linkSourceId = null
  _simulation   = null

  connect() {
    this._draw()
  }

  membersValueChanged() {
    this._clearCanvas()
    this._draw()
  }

  // ── Link-mode entry ──────────────────────────────────────────────────────────
  // Called from the "Link members" button in the panel
  startLink() {
    this._linkMode = true
    this._linkSourceId = this._selectedId
    this.panelTarget.classList.add("hidden")
    this.linkHintTarget.classList.remove("hidden")
    this.canvasTarget.style.cursor = "crosshair"
  }

  cancelLink() {
    this._resetLinkMode()
  }

  // ── Private ─────────────────────────────────────────────────────────────────
  _draw() {
    const members = this.membersValue
    if (!members.length) return

    const container = this.canvasTarget
    const W = container.clientWidth  || 900
    const H = container.clientHeight || 560

    const nodes = members.map(m => ({ ...m, id: String(m.id) }))
    const links = []
    members.forEach(m => {
      ;(m.parent_ids || []).forEach(pid => {
        if (nodes.find(n => n.id === String(pid))) {
          links.push({ source: String(pid), target: String(m.id) })
        }
      })
    })

    const svg = d3.select(container).append("svg")
      .attr("width", "100%").attr("height", "100%")

    // Arrow marker
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -4 8 8").attr("refX", 8).attr("refY", 0)
      .attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto")
      .append("path").attr("d", "M0,-4L8,0L0,4").attr("fill", "#6ee7b7")

    const g = svg.append("g")
    svg.call(
      d3.zoom().scaleExtent([0.25, 2])
        .on("zoom", e => g.attr("transform", e.transform))
    )

    // Force simulation
    this._simulation = d3.forceSimulation(nodes)
      .force("link",    d3.forceLink(links).id(d => d.id).distance(180))
      .force("charge",  d3.forceManyBody().strength(-500))
      .force("center",  d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide(95))

    // Links
    const linkSel = g.append("g")
      .selectAll("line").data(links).join("line")
      .attr("stroke", "#6ee7b7").attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)")

    // Nodes
    const nodeSel = g.append("g")
      .selectAll("g").data(nodes).join("g")
      .attr("cursor", "pointer")
      .call(
        d3.drag()
          .on("start", (event, d) => {
            if (!event.active) this._simulation.alphaTarget(0.3).restart()
            d.fx = d.x; d.fy = d.y
          })
          .on("drag", (event, d) => { d.fx = event.x; d.fy = event.y })
          .on("end", (event, d) => {
            if (!event.active) this._simulation.alphaTarget(0)
            d.fx = null; d.fy = null
          })
      )
      .on("click", (event, d) => {
        event.stopPropagation()
        this._handleNodeClick(d)
      })

    // Card background
    nodeSel.append("rect")
      .attr("width", NODE_W).attr("height", NODE_H)
      .attr("x", -NODE_W / 2).attr("y", -NODE_H / 2)
      .attr("rx", 10)
      .attr("fill", d => COLORS[d.relationship] || "#047857")
      .attr("stroke", "#a7f3d0").attr("stroke-width", 1.5)

    // Name
    nodeSel.append("text")
      .attr("text-anchor", "middle").attr("y", -8)
      .attr("fill", "white").attr("font-size", "13px").attr("font-weight", "600")
      .text(d => d.name)

    // Relationship
    nodeSel.append("text")
      .attr("text-anchor", "middle").attr("y", 10)
      .attr("fill", "#a7f3d0").attr("font-size", "11px")
      .text(d => d.relationship
        ? d.relationship.charAt(0).toUpperCase() + d.relationship.slice(1)
        : "")

    // DOB
    nodeSel.append("text")
      .attr("text-anchor", "middle").attr("y", 24)
      .attr("fill", "#6ee7b7").attr("font-size", "10px")
      .text(d => d.date_of_birth ? `b. ${d.date_of_birth}` : "")

    this._simulation.on("tick", () => {
      linkSel
        .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y)
      nodeSel.attr("transform", d => `translate(${d.x},${d.y})`)
    })

    // Click on empty canvas → close panel / cancel link
    svg.on("click", () => {
      if (this._linkMode) { this._resetLinkMode(); return }
      this.panelTarget.classList.add("hidden")
    })
  }

  _handleNodeClick(d) {
    if (this._linkMode) {
      if (this._linkSourceId && this._linkSourceId !== d.id) {
        this._createLink(this._linkSourceId, d.id)
      }
      this._resetLinkMode()
      return
    }
    this._selectedId = d.id
    this._showPanel(d)
  }

  _showPanel(d) {
    this.panelNameTarget.textContent         = d.name
    this.panelRelationshipTarget.textContent = d.relationship
      ? d.relationship.charAt(0).toUpperCase() + d.relationship.slice(1)
      : "—"
    this.panelDobTarget.textContent = d.date_of_birth ? `b. ${d.date_of_birth}` : "—"

    const basePath = `/family_trees/${this.familyTreeIdValue}/family_members/${d.id}`
    this.editLinkTarget.href     = `${basePath}/edit`
    this.deleteFormTarget.action = basePath
    this.panelTarget.classList.remove("hidden")
  }

  async _createLink(parentId, childId) {
    const child  = this.membersValue.find(m => String(m.id) === String(childId))
    if (!child) return

    const existingParents = (child.parent_ids || []).map(String)
    if (existingParents.includes(String(parentId))) return
    if (existingParents.length >= 2) {
      alert("A member can have at most 2 parents.")
      return
    }

    const form = new FormData()
    ;[...existingParents, String(parentId)].forEach(pid => {
      form.append("family_member[parent_ids][]", pid)
    })

    const res = await fetch(`/family_trees/${this.familyTreeIdValue}/family_members/${childId}`, {
      method: "PATCH",
      headers: { "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content },
      body: form
    })
    if (res.ok) window.location.reload()
  }

  _resetLinkMode() {
    this._linkMode = false
    this._linkSourceId = null
    this.linkHintTarget.classList.add("hidden")
    this.canvasTarget.style.cursor = ""
  }

  _clearCanvas() {
    const svg = this.canvasTarget.querySelector("svg")
    if (svg) svg.remove()
    if (this._simulation) this._simulation.stop()
  }
}
