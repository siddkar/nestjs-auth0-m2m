terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 1.2.1"
    }
  }
}
module "resource_server" {

  source = "./modules/auth0/resource-server"

  resource_server_name       = var.resource_server_name
  resource_server_identifier = var.resource_server_identifier
  permissions_json_file_path = var.permissions_json_file_path

  providers = {
    auth0 = auth0
  }
}

module "m2m_clients" {
  depends_on = [module.resource_server]

  source = "./modules/auth0/m2m-clients"

  resource_server_identifier    = var.resource_server_identifier
  clients_config_json_file_path = var.clients_config_json_file_path

  providers = {
    auth0 = auth0
  }
}
