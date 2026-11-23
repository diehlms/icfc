# Temporary adoption config for the first Spacelift apply.
#
# These resources were created by hand before Terraform managed them. The data
# sources find the live objects by their Hetzner names, so their real IDs are
# resolved during the plan and no resource is created or destroyed. After the
# first apply succeeds, delete this file in a follow-up PR: the IDs will then
# live in Spacelift's state.

data "hcloud_network" "existing_private_network" {
  name = "private-network"
}

data "hcloud_firewall" "existing_web_firewall" {
  name = "web-firewall"
}

data "hcloud_server" "existing_web_server" {
  name = "web-server"
}

import {
  to = hcloud_network.private_network
  id = data.hcloud_network.existing_private_network.id
}

import {
  to = hcloud_network_subnet.subnet
  # Subnets import as "<network-id>-<ip-range>".
  id = "${data.hcloud_network.existing_private_network.id}-10.0.1.0/24"
}

import {
  to = hcloud_firewall.web_firewall
  id = data.hcloud_firewall.existing_web_firewall.id
}

import {
  to = hcloud_server.web_server
  id = data.hcloud_server.existing_web_server.id
}

import {
  to = hcloud_server_network.web_server_private
  # Server-network entries import as "<server-id>-<network-id>".
  id = "${data.hcloud_server.existing_web_server.id}-${data.hcloud_network.existing_private_network.id}"
}
