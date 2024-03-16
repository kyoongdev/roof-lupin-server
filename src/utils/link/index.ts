import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

@Injectable()
export class DynamicLinkProvider {
  private readonly apiClient = axios.create({
    baseURL: 'https://firebasedynamiclinks.googleapis.com/v1',
  });
  constructor(private readonly configService: ConfigService) {}

  createDynamicLink(endPoint: string) {
    return `${this.configService.get('DYNAMIC_LINK')}/?redirect=${endPoint}&link=${this.configService.get(
      'CLIENT_URL'
    )}&apn=com.cumuco.rooflupin&isi=6450448648&ibi=com.cumuco.rooflupin&efr=1&imv=0&amv=0`;
  }
}
