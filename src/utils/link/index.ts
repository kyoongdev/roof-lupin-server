import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

@Injectable()
export class DynamicLinkProvider {
  private readonly apiClient = axios.create({
    baseURL: 'https://firebasedynamiclinks.googleapis.com/v1',
  });
  constructor(private readonly configService: ConfigService) {}

  createDynamicLink(endPoint: string, link: string) {
    return `${this.configService.get(
      'DYNAMIC_LINK'
    )}/?redirect=${endPoint}&link=${link}&apn=com.cumuco.rooflupin&isi=6450448648&ibi=com.cumuco.rooflupin&efr=1`;
  }

  //TODO: createDynamicLink
  async createDynamicShortLink(endPoint: string) {
    const response = await this.apiClient.post(
      '/shortLinks',
      {
        dynamicLinkInfo: {
          domainUriPrefix: 'https://rooflupin.page.link',
          link: `https://rooflupin.page.link/to?redirect=${endPoint}`,
          androidInfo: {
            androidPackageName: 'com.cumuco.rooflupin',
          },
          iosInfo: {
            iosBundleId: 'com.cumuco.rooflupin',
          },
        },
      },
      {
        params: {
          key: 'api_key',
        },
      }
    );

    return 'link';
  }
}
