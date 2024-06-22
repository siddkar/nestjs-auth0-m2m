# Stores resource server identifier
variable "resource_server_identifier" {
  type        = string
  description = "Resource server identifier"
}

# Stores Clients config JSON file path, i.e., name and allowed_permisions.
variable "clients_config_json_file_path" {
  type        = string
  description = "Clients config JSON file path, i.e., name and allowed_permisions. Contains the m2m clients (Applications) configuration"
}
