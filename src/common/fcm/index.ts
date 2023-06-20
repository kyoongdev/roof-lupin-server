import { Injectable } from '@nestjs/common';

import Firebase from 'firebase-admin';

import { SendPushMessage } from '@/interface/fcm.interface';

import { fcmConfig } from './fcm.config';

@Injectable()
export class FCMProvider {
  private readonly firebaseApp = Firebase.initializeApp({
    credential: Firebase.credential.cert(fcmConfig),
  });

  async sendMessage(props: SendPushMessage) {
    await this.firebaseApp.messaging().send({
      token: props.token,
      notification: {
        title: props.title,
        body: props.body,
        imageUrl: props.imageUrl,
      },
    });
  }

  async sendMessages(props: SendPushMessage[]) {
    await this.firebaseApp.messaging().sendEach(
      props.map((prop) => ({
        token: prop.token,
        notification: {
          title: prop.title,
          body: prop.body,
          imageUrl: prop.imageUrl,
        },
      }))
    );
  }
}
