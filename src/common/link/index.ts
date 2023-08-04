import { Injectable } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class DynamicLinkProvider {
  private readonly apiClient = axios.create({
    baseURL: 'https://firebasedynamiclinks.googleapis.com/v1',
  });

  //TODO: createDynamicLink
  async createDynamicLink(endPoint: string) {
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
