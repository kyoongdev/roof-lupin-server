import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import {
  PortOneCertification,
  PortOneToken,
  PortOneValidateAccount,
  PortOneValidatedAccount,
  ProtOneResponse,
} from '@/interface/payment/port-one.interface';

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
    const { bank_holder, ...rest } = params;
    try {
      const { data } = await this.apiClient.get<ProtOneResponse<PortOneValidatedAccount>>('/vbanks/holder', {
        params: {
          ...rest,
          _token: token,
        },
      });

      if (data.response.bank_holder === bank_holder) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  async validateCertification(imp_uid: string) {
    const token = await this.getToken();
    const response = await this.apiClient.get<PortOneCertification>(`/certifications/${imp_uid}`, {
      headers: { Authorization: token },
    });

    return response.data;
  }
}
