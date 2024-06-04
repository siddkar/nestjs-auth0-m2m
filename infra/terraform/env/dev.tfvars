resource_server_name = "Pets Resource Server API"
resource_server_identifier = "https://api.petstore.com/pets"
resource_server_scopes = [
    {
        scope = "read:pet"
        description = "Read Pets"
    },
    {
        scope = "create:pet"
        description = "Create Pets"
    },
    {
        scope = "update:pet"
        description = "Update Pets"
    },
    {
        scope = "delete:pet"
        description = "Delete Pets"
    },
    {
        scope = "admin:pet"
        description = "Admin Pets"
    }
]
clients_config = [
    {
        name = "Admin Pets M2M Application"
        scopes = ["admin:pet"]
    },
    {
        name = "Read Pets M2M Application"
        scopes = ["read:pet"]
    },
    {
        name = "Create/Update Pets M2M Application"
        scopes = ["read:pet", "create:pet", "update:pet"]
    }
]