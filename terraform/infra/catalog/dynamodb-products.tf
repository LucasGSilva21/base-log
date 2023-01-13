resource "aws_dynamodb_table" "baselog_products" {
  name           = "baselog-${var.environment}-products"
  billing_mode   = "PROVISIONED"
  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_ssm_parameter" "baselog_dynamodb_products_table" {
  name  = "baselog-${var.environment}-dynamodb-products-table"
  type  = "String"
  value = aws_dynamodb_table.baselog_products.name
}

output "baselog_products" {
  value = aws_dynamodb_table.baselog_products
}
