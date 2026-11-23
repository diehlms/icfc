locals {
  app_ips = toset(var.home_ips)
  ssh_ips = toset(var.ssh_ips)
}

resource "hcloud_firewall" "web_firewall" {
  name = "web-firewall"

  rule {
    direction       = "in"
    protocol        = "tcp"
    port            = "80"
    source_ips      = ["0.0.0.0/0", "::/0"]
    destination_ips = []
    description     = ""
  }

  rule {
    direction       = "in"
    protocol        = "tcp"
    port            = "443"
    source_ips      = ["0.0.0.0/0", "::/0"]
    destination_ips = []
    description     = ""
  }

  dynamic "rule" {
    for_each = local.ssh_ips

    content {
      direction       = "in"
      protocol        = "tcp"
      port            = "22"
      source_ips      = ["${rule.value}/32"]
      destination_ips = []
      description     = "DELETE ME?"
    }
  }

  dynamic "rule" {
    for_each = local.app_ips

    content {
      direction       = "in"
      protocol        = "tcp"
      port            = "3001"
      source_ips      = ["${rule.value}/32"]
      destination_ips = []
      description     = ""
    }
  }

  dynamic "rule" {
    for_each = local.app_ips

    content {
      direction       = "in"
      protocol        = "tcp"
      port            = "8080"
      source_ips      = ["${rule.value}/32"]
      destination_ips = []
      description     = ""
    }
  }

  dynamic "rule" {
    for_each = local.app_ips

    content {
      direction       = "in"
      protocol        = "tcp"
      port            = "8081"
      source_ips      = ["${rule.value}/32"]
      destination_ips = []
      # One live 8081 rule already carries this description; preserve it so
      # adoption does not rewrite the rule. Hetzner reports no description as
      # an empty string, so match that exactly for the other rules.
      description = rule.value == "3.66.198.136" ? "DELETE ME?" : ""
    }
  }
}
