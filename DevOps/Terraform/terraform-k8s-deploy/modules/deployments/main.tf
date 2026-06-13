# ============================================================
# Module : deployments
# Éuivalent de : kubectl apply -f backend.yaml frontend.yaml
# Cré:
#   - Deployment Backend Node.js  + Service NodePort
#   - Deployment Frontend Nginx   + Service NodePort
# ============================================================

variable "namespace"          { type = string }
variable "backend_image"      { type = string }
variable "frontend_image"     { type = string }
variable "backend_replicas" {
  type    = number
  default = 2
}
variable "frontend_replicas" {
  type    = number
  default = 2
}
variable "configmap_name"     { type = string }

# ============================================================
# BACKEND Node.js
# Stateless -> Deployment (pas StatefulSet)
# ============================================================
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend-deployment"
    namespace = var.namespace
  }

  spec {
    replicas = var.backend_replicas

    selector {
      match_labels = { app = "backend" }
    }

    template {
      metadata {
        labels = { app = "backend" }
      }

      spec {
        container {
          name              = "backend"
          image             = var.backend_image
          image_pull_policy = "Always"

          port { container_port = 5000 }

          env {
            name = "NODE_ENV"
            value_from {
              config_map_key_ref {
                name = var.configmap_name
                key  = "NODE_ENV"
              }
            }
          }

          env {
            name = "PORT"
            value_from {
              config_map_key_ref {
                name = var.configmap_name
                key  = "PORT"
              }
            }
          }

          env {
            name = "MONGO_URI"
            value_from {
              config_map_key_ref {
                name = var.configmap_name
                key  = "MONGO_URI"
              }
            }
          }

          env {
            name = "CORS_ORIGIN"
            value_from {
              config_map_key_ref {
                name = var.configmap_name
                key  = "CORS_ORIGIN"
              }
            }
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
            limits = {
              cpu    = "300m"
              memory = "256Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/api/projets"
              port = 5000
            }
            initial_delay_seconds = 30
            period_seconds        = 15
            failure_threshold     = 3
          }

          readiness_probe {
            http_get {
              path = "/api/projets"
              port = 5000
            }
            initial_delay_seconds = 15
            period_seconds        = 10
            failure_threshold     = 3
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "backend" {
  metadata {
    name      = "backend-service"
    namespace = var.namespace
  }

  spec {
    selector = { app = "backend" }
    type     = "NodePort"

    port {
      port        = 5000
      target_port = 5000
    }
  }
}

# ============================================================
# FRONTEND React / Nginx
# ============================================================
resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend-deployment"
    namespace = var.namespace
  }

  spec {
    replicas = var.frontend_replicas

    selector {
      match_labels = { app = "frontend" }
    }

    template {
      metadata {
        labels = { app = "frontend" }
      }

      spec {
        container {
          name              = "frontend"
          image             = var.frontend_image
          image_pull_policy = "Always"

          port { container_port = 80 }

          resources {
            requests = {
              cpu    = "50m"
              memory = "64Mi"
            }
            limits = {
              cpu    = "200m"
              memory = "128Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/"
              port = 80
            }
            initial_delay_seconds = 10
            period_seconds        = 15
            failure_threshold     = 3
          }

          readiness_probe {
            http_get {
              path = "/"
              port = 80
            }
            initial_delay_seconds = 5
            period_seconds        = 10
            failure_threshold     = 3
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "frontend-service"
    namespace = var.namespace
  }

  spec {
    selector = { app = "frontend" }
    type     = "NodePort"

    port {
      port        = 80
      target_port = 80
    }
  }
}

output "backend_name" {
  description = "Nom du Deployment Backend"
  value       = kubernetes_deployment.backend.metadata[0].name
}

output "frontend_name" {
  description = "Nom du Deployment Frontend"
  value       = kubernetes_deployment.frontend.metadata[0].name
}# ============================================================
# Module : deployments
# Équivalent de : kubectl apply -f backend.yaml frontend.yaml
# Crée :
#   - Deployment Backend Node.js  + Service NodePort
#   - Deployment Frontend Nginx   + Service NodePort
# ============================================================

variable "namespace"          { type = string }
variable "backend_image"      { type = string }
variable "frontend_image"     { type = string }
variable "backend_replicas"   { type = number; default = 2 }
variable "frontend_replicas"  { type = number; default = 2 }
variable "configmap_name"     { type = string }

# ============================================================
# BACKEND Node.js
# Stateless -> Deployment (pas StatefulSet)
# ============================================================
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend-deployment"
    namespace = var.namespace
  }

  spec {
    replicas = var.backend_replicas

    selector {
      match_labels = { app = "backend" }
    }

    template {
      metadata {
        labels = { app = "backend" }
      }

      spec {
        container {
          name              = "backend"
          image             = var.backend_image
          image_pull_policy = "Always"

          port { container_port = 5000 }

          # Variables d'environnement depuis le ConfigMap
          env {
            name = "NODE_ENV"
            value_from {
              config_map_key_ref {
                name = var.configmap_name
                key  = "NODE_ENV"
              }
            }
          }

          env {
            name = "PORT"
            value_from {
              config_map_key_ref {
                name = var.configmap_name
                key  = "PORT"
              }
            }
          }

          env {
            name = "MONGO_URI"
            value_from {
              config_map_key_ref {
                name = var.configmap_name
                key  = "MONGO_URI"
              }
            }
          }

          env {
            name = "CORS_ORIGIN"
            value_from {
              config_map_key_ref {
                name = var.configmap_name
                key  = "CORS_ORIGIN"
              }
            }
          }

          # Limites et réservations CPU/mémoire
          resources {
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
            limits = {
              cpu    = "300m"
              memory = "256Mi"
            }
          }

          # Liveness probe : redémarre le pod si /api/projets ne répond plus
          liveness_probe {
            http_get {
              path = "/api/projets"
              port = 5000
            }
            initial_delay_seconds = 30
            period_seconds        = 15
            failure_threshold     = 3
          }

          # Readiness probe : retire le pod du Service si pas prêt
          readiness_probe {
            http_get {
              path = "/api/projets"
              port = 5000
            }
            initial_delay_seconds = 15
            period_seconds        = 10
            failure_threshold     = 3
          }
        }
      }
    }
  }
}

# Service Backend (NodePort)
resource "kubernetes_service" "backend" {
  metadata {
    name      = "backend-service"
    namespace = var.namespace
  }

  spec {
    selector = { app = "backend" }
    type     = "NodePort"

    port {
      port        = 5000
      target_port = 5000
    }
  }
}

# ============================================================
# FRONTEND React / Nginx
# Nginx sert les fichiers statiques (npm run build) -> Stateless
# ============================================================
resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend-deployment"
    namespace = var.namespace
  }

  spec {
    replicas = var.frontend_replicas

    selector {
      match_labels = { app = "frontend" }
    }

    template {
      metadata {
        labels = { app = "frontend" }
      }

      spec {
        container {
          name              = "frontend"
          image             = var.frontend_image
          image_pull_policy = "Always"

          port { container_port = 80 }

          # Frontend très léger : ressources inférieures au backend
          resources {
            requests = {
              cpu    = "50m"
              memory = "64Mi"
            }
            limits = {
              cpu    = "200m"
              memory = "128Mi"
            }
          }

          # Nginx démarre vite : délai initial court (10s)
          liveness_probe {
            http_get {
              path = "/"
              port = 80
            }
            initial_delay_seconds = 10
            period_seconds        = 15
            failure_threshold     = 3
          }

          readiness_probe {
            http_get {
              path = "/"
              port = 80
            }
            initial_delay_seconds = 5
            period_seconds        = 10
            failure_threshold     = 3
          }
        }
      }
    }
  }
}

# Service Frontend (NodePort)
resource "kubernetes_service" "frontend" {
  metadata {
    name      = "frontend-service"
    namespace = var.namespace
  }

  spec {
    selector = { app = "frontend" }
    type     = "NodePort"

    port {
      port        = 80
      target_port = 80
    }
  }
}

# --- Outputs du module ---
output "backend_name" {
  description = "Nom du Deployment Backend"
  value       = kubernetes_deployment.backend.metadata[0].name
}

output "frontend_name" {
  description = "Nom du Deployment Frontend"
  value       = kubernetes_deployment.frontend.metadata[0].name
}
