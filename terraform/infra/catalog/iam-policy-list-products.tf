resource "aws_iam_policy" "baselog_list_products_policy" {
  name = "baselog-${var.environment}-list-products-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:Scan",
        ]
        Effect   = "Allow"
        Resource = "${aws_dynamodb_table.baselog_products.arn}"
      },
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}
