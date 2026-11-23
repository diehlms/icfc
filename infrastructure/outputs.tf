output "server_ip" {
  description = "Public IPv4 address of the web server"
  value       = hcloud_server.web_server.ipv4_address
}
