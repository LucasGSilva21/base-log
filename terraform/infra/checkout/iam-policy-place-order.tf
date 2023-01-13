resource "aws_iam_policy" "baselog_place_order_policy" {
  name = "baselog-${var.environment}-place-order-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "dynamodb:PutItem"
        ]
        Effect   = "Allow"
        Resource = "${aws_dynamodb_table.baselog_orders.arn}"
      },
      {
        Action = [
          "dynamodb:Query"
        ]
        Effect   = "Allow"
        Resource = "${var.baselog_products.arn}"
      },
      {
        Action = [
          "dynamodb:PutItem"
        ]
        Effect   = "Allow"
        Resource = "${var.baselog_transactions.arn}"
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
