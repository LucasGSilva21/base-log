resource "aws_dynamodb_table" "baselog_accounts" {
  name           = "baselog-${var.environment}-accounts"
  billing_mode   = "PROVISIONED"
  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name            = "${var.environment}-email-index"
    hash_key        = "email"
    write_capacity  = var.write_capacity
    read_capacity   = var.read_capacity
    projection_type = "ALL"
  }
}

resource "aws_ssm_parameter" "baselog_dynamodb_accounts_table" {
  name  = "baselog-${var.environment}-dynamodb-accounts-table"
  type  = "String"
  value = aws_dynamodb_table.baselog_accounts.name
}

resource "aws_ssm_parameter" "baselog_email_index" {
  name = "baselog-${var.environment}-email-index"
  type = "String"
  value = "${var.environment}-email-index"
}
