# ICFC infrastructure

Terraform for the Hetzner Cloud resources behind icfc.net. Spacelift owns the
state for this stack, so there is intentionally no `backend` or `cloud` block
in the configuration.

## Spacelift stack

- Root directory: `infrastructure`
- Terraform version: 1.6 or newer (import IDs are resolved from data sources)
- Environment variables:
  - `TF_VAR_hcloud_token` (sensitive): Hetzner Cloud API token
  - `TF_VAR_home_ips` / `TF_VAR_ssh_ips` (optional): the IPs currently allowed
    through `web-firewall`. Defaults mirror the live rules; override only when
    changing them.
- No SSH key is needed on the Spacelift worker. The public key is already
  registered with Hetzner and attached to the server. The old `remote-exec`
  provisioner that created the `devuser` account has been removed: that
  one-time bootstrap already happened on the server and is not Terraform's
  concern.

## First apply (adoption)

`imports.tf` looks up the existing network, subnet, firewall, server and
private-network attachment by their Hetzner IDs/names and imports them into
Spacelift's state during the first plan. Check that the plan contains import
actions only: no "create", "destroy" or "replace" for those resources. Then
confirm the apply.

The Hetzner provider does not populate `location`, `ssh_keys` or the inline
`network` / `public_net` blocks when it imports a server. `server.tf` therefore
ignores changes to the two ForceNew attributes and manages the network
attachment with `hcloud_server_network` instead. Public IPv4/IPv6 settings are
left as they are. `prevent_destroy` guards the server until you deliberately
remove it.

Once the apply has succeeded, remove `imports.tf` in a follow-up PR. The
resource IDs are in state by then, so the data sources and import blocks are
no longer needed.

## Local checks

```sh
cd infrastructure
terraform fmt -check -recursive
terraform init -backend=false
terraform validate
```
