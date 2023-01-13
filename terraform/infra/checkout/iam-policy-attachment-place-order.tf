resource "aws_iam_policy_attachment" "baselog_place_order_policy_attachement" {
  name       = "baselog-${var.environment}-place-order-attachment"
  roles      = ["${aws_iam_role.baselog_place_order_iam_role.name}"]
  policy_arn = aws_iam_policy.baselog_place_order_policy.arn
}
