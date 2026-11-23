data "hcloud_ssh_key" "my_key" {
  name = "diehl_default"
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
  ssh_keys     = [data.hcloud_ssh_key.my_key.id]

  public_net {
    ipv4_enabled = true
    ipv6_enabled = true
  }

  # The subnet must exist before a server can be attached to the network.
  depends_on = [hcloud_network_subnet.subnet]
}
