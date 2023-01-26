import AWS from 'aws-sdk';
import { NotifyService } from '@notification/application/services';

export class SnsNotifyService implements NotifyService {
  async sendEmailToAdmin(message: string): Promise<void> {
    AWS.config.update({
      region: 'us-east-1'
    });

    const SNS = new AWS.SNS();

    SNS.publish({
      TopicArn: 'arn:aws:sns:us-east-1:114741601475:baselog-dev-notifications',
      Message: message
    }).promise();
  }
}
