# ICFC infrastructure

Terraform for the Hetzner Cloud resources behind icfc.net. Spacelift owns the
state for this stack, so there is intentionally no `backend` or `cloud` block
in the configuration.

## Spacelift stack

- Root directory: `infrastructure`
- Terraform version: 1.6 or newer (import IDs are resolved from data sources)
- Environment variables:
  - `TF_VAR_hcloud_token` (sensitive): Hetzner Cloud API token
  - `TF_VAR_home_ips`: JSON array of the public IPs currently allowed through
    `web-firewall`, e.g. `["203.0.113.10"]`. Use the same values that were used
    when the firewall was created by hand so the first plan does not rewrite
    its rules.
- No SSH key is needed on the Spacelift worker. The old `remote-exec`
  provisioner that created the `devuser` account has been removed: that
  one-time bootstrap already happened on the server and is not Terraform's
  concern.

## First apply (adoption)

`imports.tf` looks up the existing network, subnet, firewall and server by
their Hetzner names and imports them into Spacelift's state during the first
plan. Check that the plan contains import actions only: no "create",
"destroy" or "replace" for those resources. Then confirm the apply.

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
