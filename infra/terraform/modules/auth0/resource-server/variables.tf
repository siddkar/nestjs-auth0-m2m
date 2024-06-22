# Stores resource server name
variable "resource_server_name" {
  type        = string
  description = "Resource server (API) name (ex. Pets API Resource Server)"
}

# Stores resource server identifier
variable "resource_server_identifier" {
  type        = string
  description = "Resource server (API) identifier (ex. https://api.pets.com/v1)"
}

# Stores access token lifetime in seconds
variable "access_token_lifetime" {
  type        = number
  description = "Number of seconds during which access tokens issued for this resource server from the token endpoint remain valid (ex. 3600)"
  default     = 3600
}

# Stores Permissions master set JSON file path
variable "permissions_json_file_path" {
  type        = string
  description = "Permissions master set JSON file path. Contains resource server scopes."
}
