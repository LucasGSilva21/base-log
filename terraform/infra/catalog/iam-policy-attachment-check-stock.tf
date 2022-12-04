resource "aws_iam_policy_attachment" "baselog_check_stock_policy_attachement" {
  name       = "baselog-${var.environment}-check-stock-attachment"
  roles      = ["${aws_iam_role.baselog_check_stock_iam_role.name}"]
  policy_arn = aws_iam_policy.baselog_check_stock_policy.arn
}
