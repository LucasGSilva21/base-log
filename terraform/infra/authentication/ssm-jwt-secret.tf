resource "aws_ssm_parameter" "baselog_jwt_secret" {
  name      = "baselog-${var.environment}-jwt-secret"
  type      = "String"
  value     = "secret"
  overwrite = false

  lifecycle {
    ignore_changes = [
      value
    ]
  }
}
