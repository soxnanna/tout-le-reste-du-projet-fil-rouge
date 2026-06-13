# ============================================================
# Module : configmap
# Crée un ConfigMap (variables non-sensibles) et un Secret
# (mot de passe MongoDB) dans le namespace Kubernetes cible.
# ============================================================

variable "namespace"      { type = string }
variable "node_env"       { type = string }
variable "port"           { type = string }
variable "mongo_uri"      { type = string }
variable "cors_origin"    { type = string }
variable "mongo_password" {
  type      = string
  sensitive = true
}

# --- ConfigMap : variables non-sensibles ---
resource "kubernetes_config_map" "portfolio" {
  metadata {
    name      = "portfolio-config"
    namespace = var.namespace
  }

  data = {
    NODE_ENV    = var.node_env
    PORT        = var.port
    MONGO_URI   = var.mongo_uri
    CORS_ORIGIN = var.cors_origin
  }
}

# --- Secret Kubernetes : données sensibles ---
resource "kubernetes_secret" "portfolio" {
  metadata {
    name      = "portfolio-secret"
    namespace = var.namespace
  }

  type = "Opaque"

  data = {
    MONGO_PASSWORD = var.mongo_password
  }
}

# --- Outputs du module ---
output "configmap_name" {
  description = "Nom du ConfigMap créé"
  value       = kubernetes_config_map.portfolio.metadata[0].name
}

output "secret_name" {
  description = "Nom du Secret créé"
  value       = kubernetes_secret.portfolio.metadata[0].name
}
