terraform {
  required_version = ">= 1.3"
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "minikube"
}

variable "backend_image"  { type = string }
variable "frontend_image" { type = string }

locals {
  namespace     = "portfolio"
  mongo_uri     = "mongodb://mongodb-service:27017/portfolio"
  cors_origin   = "http://localhost:3000"
}

# Création du namespace
resource "kubernetes_namespace" "portfolio" {
  metadata { name = local.namespace }
}

# Module ConfigMap & Secret
module "configmap" {
  source = "./modules/configmap"

  namespace      = local.namespace
  node_env       = "production"
  port           = "5000"
  mongo_uri      = local.mongo_uri
  cors_origin    = local.cors_origin
  mongo_password = var.mongo_password
}

# Module Deployments Backend + Frontend
module "deployments" {
  source = "./modules/deployments"

  namespace       = local.namespace
  backend_image   = var.backend_image
  frontend_image  = var.frontend_image
  configmap_name  = module.configmap.configmap_name
}

variable "mongo_password" {
  type      = string
  sensitive = true
  default   = "changeme"
}
