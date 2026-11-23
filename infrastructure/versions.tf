# Spacelift owns state for this stack, so there is deliberately no backend or
# cloud block here. The import IDs in imports.tf are resolved from data
# sources, which needs Terraform >= 1.6.
terraform {
  required_version = ">= 1.6"

  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.45.0"
    }
  }
}
