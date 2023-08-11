import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

import { SolapiMessageService } from 'solapi';

import { ALARM_TALK_EVENT_NAME } from './constants';

@Injectable()
export class AlarmTalkEventProvider {
  private readonly solaapi = new SolapiMessageService(
    this.configService.get('SOLAPI_API_KEY'),
    this.configService.get('SOLAPI_API_SECRET')
  );

  constructor(private readonly configService: ConfigService) {}

  @OnEvent(ALARM_TALK_EVENT_NAME.SEND_MESSAGE)
  async sendMessage(targetPhoneNumber: string, templateId: string, variables?: any) {
    await this.solaapi.send({
      to: targetPhoneNumber,
      kakaoOptions: {
        pfId: this.configService.get('SOLAPI_PFID'),
        templateId,
        variables: variables ?? {},
      },
    });
  }
}
