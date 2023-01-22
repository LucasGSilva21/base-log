resource "aws_sns_topic" "baselog_notifications" {
  name = "baselog-${var.environment}-notifications"
}

resource "aws_ssm_parameter" "baselog_notifications_topic" {
  name  = "baselog-${var.environment}-notification-topic"
  type  = "String"
  value = "${aws_sns_topic.baselog_notifications.arn}"
}

resource "aws_sns_topic_subscription" "email_target" {
  topic_arn = aws_sns_topic.baselog_notifications.arn
  protocol  = "email"
  endpoint  = "lucas.silva22@estudante.ufla.br"
}
