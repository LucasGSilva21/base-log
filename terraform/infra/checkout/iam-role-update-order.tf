resource "aws_iam_role" "baselog_update_order_iam_role" {
  name = "baselog-${var.environment}-update-order-iam-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_ssm_parameter" "baselog_update_order_iam_role" {
  name  = "baselog-${var.environment}-update-order-iam-role"
  type  = "String"
  value = aws_iam_role.baselog_update_order_iam_role.arn
}
