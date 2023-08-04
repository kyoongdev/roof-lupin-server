import { Injectable } from '@nestjs/common';

import Firebase from 'firebase-admin';

import { SendMessage, SendPushMessage } from '@/interface/fcm.interface';

import { fcmConfig } from './fcm.config';

@Injectable()
export class FCMProvider {
  private readonly firebaseApp = Firebase.initializeApp({
    credential: Firebase.credential.cert(fcmConfig),
  });

  async sendMessage(props: SendMessage) {
    await this.firebaseApp.messaging().send({
      token: props.token,
      notification: {
        title: props.title,
        body: props.body,
      },
      data: {
        title: props.title,
        body: props.body,
      },
      android: {
        data: {
          title: props.title,
          body: props.body,
        },
      },
      ...(props.link && {
        webpush: {
          fcmOptions: {
            link: props.link,
          },
          data: {
            title: props.title,
            body: props.body,
          },
        },
      }),
    });
  }

  async sendMessages(props: SendMessage[]) {
    await this.firebaseApp.messaging().sendEach(
      props.map((prop) => ({
        token: prop.token,
        notification: {
          title: prop.title,
          body: prop.body,
        },
        data: {
          title: prop.title,
          body: prop.body,
        },
      }))
    );
  }
}
