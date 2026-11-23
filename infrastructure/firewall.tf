locals {
  admin_ips = toset(var.home_ips)
}

resource "hcloud_firewall" "web_firewall" {
  name = "web-firewall"

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  dynamic "rule" {
    for_each = local.admin_ips

    content {
      direction  = "in"
      protocol   = "tcp"
      port       = "22"
      source_ips = ["${rule.value}/32"]
    }
  }

  dynamic "rule" {
    for_each = local.admin_ips

    content {
      direction  = "in"
      protocol   = "tcp"
      port       = "3001"
      source_ips = ["${rule.value}/32"]
    }
  }

  dynamic "rule" {
    for_each = local.admin_ips

    content {
      direction  = "in"
      protocol   = "tcp"
      port       = "8080"
      source_ips = ["${rule.value}/32"]
    }
  }

  dynamic "rule" {
    for_each = local.admin_ips

    content {
      direction  = "in"
      protocol   = "tcp"
      port       = "8081"
      source_ips = ["${rule.value}/32"]
    }
  }

  rule {
    direction       = "out"
    protocol        = "tcp"
    port            = "any"
    destination_ips = ["0.0.0.0/0", "::/0"]
  }
}
