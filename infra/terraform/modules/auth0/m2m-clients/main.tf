terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 1.2.1"
    }
  }
}

locals {
  clients_config = jsondecode(file("${path.root}/${var.clients_config_json_file_path}"))
}

resource "auth0_client" "m2m_clients" {
  for_each = { for idx, client in local.clients_config : idx => client }

  name        = each.value.name
  description = each.value.description
  app_type    = "non_interactive"

  jwt_configuration {
    alg = "RS256"
  }
}

resource "auth0_client_grant" "m2m_client_grants" {
  for_each = { for idx, client_grant in local.clients_config : idx => client_grant }

  client_id = auth0_client.m2m_clients[each.key].id
  audience  = var.resource_server_identifier
  scopes    = each.value.allowed_permissions
}
