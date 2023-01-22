module "authentication" {
  source         = "../../infra/authentication"
  environment    = var.environment
  write_capacity = 1
  read_capacity  = 1
}

module "catalog" {
  source         = "../../infra/catalog"
  environment    = var.environment
  write_capacity = 1
  read_capacity  = 1
}

module "payment" {
  source         = "../../infra/payment"
  environment    = var.environment
  write_capacity = 1
  read_capacity  = 1
}

module "checkout" {
  source               = "../../infra/checkout"
  environment          = var.environment
  write_capacity       = 1
  read_capacity        = 1
  baselog_products     = module.catalog.baselog_products
  baselog_transactions = module.payment.baselog_transactions
}

module "notification" {
  source         = "../../infra/notification"
  environment    = var.environment
}
