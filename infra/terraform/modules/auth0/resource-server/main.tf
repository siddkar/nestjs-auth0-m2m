terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 1.2.1"
    }
  }
}

locals {
  permissions = jsondecode(file("${path.root}/${var.permissions_json_file_path}"))
}

resource "auth0_resource_server" "resource_server" {
  name        = var.resource_server_name
  identifier  = var.resource_server_identifier
  signing_alg = "RS256"

  allow_offline_access                            = true
  token_lifetime                                  = var.access_token_lifetime
  skip_consent_for_verifiable_first_party_clients = true
}

resource "auth0_resource_server_scope" "resource_server_scope" {
  for_each = { for idx, permission in local.permissions : idx => permission }

  resource_server_identifier = auth0_resource_server.resource_server.identifier
  scope                      = each.value.scope
  description                = each.value.description
}
