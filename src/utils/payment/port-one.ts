import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import { PortOneToken, PortOneValidateAccount, ProtOneResponse } from '@/interface/payment/port-one.interface';

@Injectable()
export class PortOneProvider {
  private apiClient = axios.create({
    baseURL: 'https://api.iamport.kr',
  });
  constructor(private readonly configService: ConfigService) {}

  // 액세스 토큰 얻기
  async getToken(): Promise<string> {
    try {
      const response = await this.apiClient.post<ProtOneResponse<PortOneToken>>('/users/getToken', {
        imp_key: this.configService.get<string>('PORTONE_API_KEY'),
        imp_secret: this.configService.get<string>('PORTONE_API_SECRET'),
      });
      const { access_token } = response.data.response;
      return access_token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateAccount(params: PortOneValidateAccount) {
    const token = await this.getToken();

    try {
      await this.apiClient.get('/vbanks/holder', {
        params: {
          ...params,
          _token: token,
        },
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
