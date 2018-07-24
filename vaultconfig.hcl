storage "file" {
  path = "/Users/guy/vault_ent/temp"
}

listener "tcp" {
  address     = "0.0.0.0:8080"
  tls_disable = 1
}

ui = true

disable_mlock = true
