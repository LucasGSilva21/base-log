resource "aws_iam_policy_attachment" "baselog_signin_policy_attachement" {
  name       = "baselog-${var.environment}-signin-attachment"
  roles      = ["${aws_iam_role.baselog_signin_iam_role.name}"]
  policy_arn = aws_iam_policy.baselog_signin_policy.arn
}
