import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import {
  PortOneGetPayment,
  PortOneGetToken,
  PortOnePayment,
  PortOnePreparePayment,
  PortOneToken,
} from '@/interface/payment/port-one.interface';

@Injectable()
export class PortOneProvider {
  private apiClient = axios.create({
    baseURL: 'https://api.iamport.kr',
  });
  constructor(private readonly configService: ConfigService) {}

  async preparePayment(data: PortOnePreparePayment) {
    const response = await this.apiClient.post<PortOnePreparePayment>('/payments/prepare', data);

    return response.data;
  }

  async completePayment(props: PortOneGetPayment) {
    const payment = await this.getPayment(props);

    return payment;
  }

  async getPayment(props: PortOneGetPayment) {
    const token = await this.getToken({
      imp_key: this.configService.get('PORT_ONE_IMP_KEY'),
      imp_secret: this.configService.get('PORT_ONE_IMP_SECRET_KEY'),
    });

    const response = await this.apiClient.get<PortOnePayment>(`/payments/${props.imp_uid}`, {
      headers: this.getHeader(token),
    });

    return response.data;
  }

  async getToken(data: PortOneGetToken) {
    const response = await this.apiClient.post<PortOneToken>('/users/getToken', data);

    return response.data.access_token;
  }

  getHeader(token: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }
}
