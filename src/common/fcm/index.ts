import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import Firebase from 'firebase-admin';

import { fcmConfig } from './fcm.config';

@Injectable()
export class FCMProvider {
  private readonly firebaseApp = Firebase.initializeApp({
    credential: Firebase.credential.cert(fcmConfig),
  });
  constructor(private readonly configService: ConfigService) {}

  async sendMessage() {
    const condition = "'stock-GOOG' in topics || 'industry-tech' in topics";
    const topicName = 'industry-tech';
    await this.firebaseApp.messaging().send({
      token: '',
      notification: {
        body: 'asdf',
        imageUrl: 'asdf',
        title: 'asdf',
      },
    });
  }
}
