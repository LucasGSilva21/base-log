resource "aws_iam_role" "baselog_list_products_iam_role" {
  name = "baselog-${var.environment}-list-products-iam-role"

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

resource "aws_ssm_parameter" "baselog_list_products_iam_role" {
  name  = "baselog-${var.environment}-list-products-iam-role"
  type  = "String"
  value = aws_iam_role.baselog_list_products_iam_role.arn
}
