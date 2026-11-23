data "hcloud_ssh_key" "my_key" {
  name = "diehl_default"
}

resource "hcloud_server" "web_server" {
  name         = "web-server"
  server_type  = "cx22"
  image        = "ubuntu-22.04"
  location     = "nbg1"
  backups      = true
  labels       = {}
  firewall_ids = [hcloud_firewall.web_firewall.id]
  ssh_keys     = [data.hcloud_ssh_key.my_key.id]

  lifecycle {
    prevent_destroy = true

    # The provider does not populate these ForceNew attributes when importing
    # a server. Ignoring them keeps the live server in place; the private key
    # is only needed for SSH access, not by Terraform.
    ignore_changes = [location, ssh_keys]
  }
}

# The provider also does not import inline `network` / `public_net` blocks.
# Manage the private-network attachment as its own importable resource and
# leave the public net settings as they are (IPv4 and IPv6 both enabled).
resource "hcloud_server_network" "web_server_private" {
  server_id  = hcloud_server.web_server.id
  network_id = hcloud_network.private_network.id

  depends_on = [hcloud_network_subnet.subnet]
}
