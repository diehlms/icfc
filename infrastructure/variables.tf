variable "hcloud_token" {
  description = "Hetzner Cloud API token (set as TF_VAR_hcloud_token in Spacelift)"
  type        = string
  sensitive   = true
}

variable "home_ips" {
  description = "Public IPs allowed to reach SSH and the app's dev ports (set as TF_VAR_home_ips in Spacelift)"
  type        = list(string)
}
