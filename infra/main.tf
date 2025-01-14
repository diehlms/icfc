terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45.0"
    }
  }
}

variable "hcloud_token" {
  description = "Hetzner Cloud API Token"
  sensitive   = true
}

variable "home_ips" {
  description = "My home network IP address (CIDR notation)"
  type        = list(string)
}

variable "username" {
  description = "The username for the new user"
  type        = string
  default     = "devuser"
}

provider "hcloud" {
  token = var.hcloud_token
}

resource "hcloud_network" "private_network" {
  name     = "private-network"
  ip_range = "10.0.0.0/16"
}

resource "hcloud_network_subnet" "subnet" {
  type         = "cloud"
  network_id   = hcloud_network.private_network.id
  network_zone = "eu-central"
  ip_range     = "10.0.1.0/24"
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
    for_each = var.home_ips

    content {
      direction = "in"
      protocol = "tcp"
      port = "22"
      source_ips = ["${rule.value}/32"]
    }
  }

  # grafana

  dynamic "rule" {
    for_each = var.home_ips

    content {
      direction = "in"
      protocol = "tcp"
      port = "3001"
      source_ips = ["${rule.value}/32"]
    }
  }

  rule {
    direction  = "out"
    protocol   = "tcp"
    port       = "any"
    destination_ips = ["0.0.0.0/0", "::/0"]
  }
}

resource "hcloud_server" "web_server" {
  name        = "web-server"
  server_type = "cx22"
  image       = "ubuntu-22.04"
  location    = "nbg1"

  network {
    network_id = hcloud_network.private_network.id
  }

  firewall_ids = [hcloud_firewall.web_firewall.id]

  public_net {
    ipv4_enabled = true
    ipv6_enabled = true
  }

  ssh_keys = [data.hcloud_ssh_key.my_key.id]

  connection {
    type        = "ssh"
    user        = "root"
    private_key = file("~/.ssh/id_rsa")  # Adjust path to your private key
    host        = self.ipv4_address
  }

  provisioner "remote-exec" {
    inline = [
      "useradd -m -s /bin/bash ${var.username}",
      "mkdir -p /home/${var.username}/.ssh",
      "cp /root/.ssh/authorized_keys /home/${var.username}/.ssh/",
      "chown -R ${var.username}:${var.username} /home/${var.username}/.ssh",
      "chmod 700 /home/${var.username}/.ssh",
      "chmod 600 /home/${var.username}/.ssh/authorized_keys",
      "usermod -aG sudo ${var.username}",
      "echo '${var.username} ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/${var.username}",
      "chmod 440 /etc/sudoers.d/${var.username}"
    ]
  }
}

data "hcloud_ssh_key" "my_key" {
  name = "diehl_default"
}

output "server_ip" {
  value = hcloud_server.web_server.ipv4_address
}