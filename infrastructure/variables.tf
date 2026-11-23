variable "hcloud_token" {
  description = "Hetzner Cloud API token (set as TF_VAR_hcloud_token in Spacelift)"
  type        = string
  sensitive   = true
}

variable "home_ips" {
  description = "Public IPs allowed to reach the app's dev ports (3001, 8080, 8081)"
  type        = list(string)
  # Defaults mirror the live firewall rules so adoption is a no-op. Override in
  # Spacelift if the allowed IPs change later.
  default = [
    "3.66.198.136",
    "98.109.77.204",
    "174.21.214.11",
    "193.121.74.143",
  ]
}

variable "ssh_ips" {
  description = "Public IPs allowed to reach SSH on port 22"
  type        = list(string)
  # The live rules carry a "DELETE ME?" description; kept here so importing
  # does not rewrite them. Removing those rules is a separate change.
  default = [
    "3.66.198.136",
    "63.231.50.75",
    "97.113.55.47",
    "97.126.85.9",
    "98.109.77.204",
    "174.21.214.11",
    "174.21.215.90",
    "193.121.74.143",
  ]
}
