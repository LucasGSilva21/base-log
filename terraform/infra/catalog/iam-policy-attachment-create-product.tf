resource "aws_iam_policy_attachment" "baselog_create_product_policy_attachement" {
  name       = "baselog-${var.environment}-create-product-attachment"
  roles      = ["${aws_iam_role.baselog_create_product_iam_role.name}"]
  policy_arn = aws_iam_policy.baselog_create_product_policy.arn
}
