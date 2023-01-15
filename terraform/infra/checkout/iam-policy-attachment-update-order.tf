resource "aws_iam_policy_attachment" "baselog_update_order_policy_attachement" {
  name       = "baselog-${var.environment}-update-order-attachment"
  roles      = ["${aws_iam_role.baselog_update_order_iam_role.name}"]
  policy_arn = aws_iam_policy.baselog_update_order_policy.arn
}
