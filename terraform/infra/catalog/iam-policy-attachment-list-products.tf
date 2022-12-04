resource "aws_iam_policy_attachment" "baselog_list_products_policy_attachement" {
  name       = "baselog-${var.environment}-list-products-attachment"
  roles      = ["${aws_iam_role.baselog_list_products_iam_role.name}"]
  policy_arn = aws_iam_policy.baselog_list_products_policy.arn
}
