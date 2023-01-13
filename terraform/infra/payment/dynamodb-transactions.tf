resource "aws_dynamodb_table" "baselog_transactions" {
  name           = "baselog-${var.environment}-transactions"
  billing_mode   = "PROVISIONED"
  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "orderId"
    type = "S"
  }

  global_secondary_index {
    name            = "${var.environment}-order-id-index"
    hash_key        = "orderId"
    write_capacity  = var.write_capacity
    read_capacity   = var.read_capacity
    projection_type = "ALL"
  }
}

resource "aws_ssm_parameter" "baselog_dynamodb_transactions_table" {
  name  = "baselog-${var.environment}-dynamodb-transactions-table"
  type  = "String"
  value = aws_dynamodb_table.baselog_transactions.name
}

resource "aws_ssm_parameter" "baselog_order_id_index" {
  name = "baselog-${var.environment}-order-id-index"
  type = "String"
  value = "${var.environment}-order-id-index"
}

output "baselog_transactions" {
  value = aws_dynamodb_table.baselog_transactions
}
