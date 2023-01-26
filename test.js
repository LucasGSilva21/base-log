// eslint-disable-next-line @typescript-eslint/no-var-requires
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const SNS = new AWS.SNS();

try {
  SNS.publish({
    TopicArn: 'arn:aws:sns:us-east-1:114741601475:baselog-dev-notifications',
    Message: 'Test'
  }).promise();
} catch (e) {
  console.log(e);
}
