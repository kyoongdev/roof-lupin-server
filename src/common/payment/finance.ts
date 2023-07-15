import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';
import { nanoid, random } from 'nanoid';

import { FinanceUserAuthorizationResBody } from '@/interface/payment/finance.interface';

@Injectable()
export class FinanceProvider {
  private apiClient = axios.create({
    baseURL: 'https://testapi.openbanking.or.kr',
  });

  constructor(private readonly configService: ConfigService) {}

  async getCode() {
    try {
      const response = await this.apiClient.get('/oauth/2.0/authorize', {
        params: {
          response_type: 'code',
          client_id: this.configService.get<string>('FINANCE_OPEN_API_CLIENT_ID'),
          redirect_uri: this.configService.get<string>('FINANCE_OPEN_API_REDIRECT_URL'),
          scope: 'login inquiry transfer',
          state: nanoid(32),
          auth_type: 1,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getToken() {
    try {
      const response = await this.apiClient.post<FinanceUserAuthorizationResBody>('/oauth/2.0/token', undefined, {
        params: {
          client_id: this.configService.get<string>('FINANCE_OPEN_API_CLIENT_ID'),
          client_secret: this.configService.get<string>('FINANCE_OPEN_API_CLIENT_SECRET'),
          grant_type: 'client_credentials',
          scope: 'oob',
        },
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  getHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
