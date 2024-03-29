resource "aws_iam_role" "baselog_check_stock_iam_role" {
  name = "baselog-${var.environment}-check-stock-iam-role"

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

resource "aws_ssm_parameter" "baselog_check_stock_iam_role" {
  name  = "baselog-${var.environment}-check-stock-iam-role"
  type  = "String"
  value = aws_iam_role.baselog_check_stock_iam_role.arn
}
