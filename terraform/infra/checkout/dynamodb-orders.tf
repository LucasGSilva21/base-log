resource "aws_dynamodb_table" "baselog_orders" {
  name           = "baselog-${var.environment}-orders"
  billing_mode   = "PROVISIONED"
  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_ssm_parameter" "baselog_dynamodb_orders_table" {
  name  = "baselog-${var.environment}-dynamodb-orders-table"
  type  = "String"
  value = aws_dynamodb_table.baselog_orders.name
}
