resource "aws_iam_policy_attachment" "baselog_signup_policy_attachement" {
  name       = "baselog-${var.environment}-signup-attachment"
  roles      = ["${aws_iam_role.baselog_signup_iam_role.name}"]
  policy_arn = aws_iam_policy.baselog_signup_policy.arn
}
