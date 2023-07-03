import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import {
  CancelPortOnePayment,
  PortOneGetPayment,
  PortOneGetToken,
  PortOnePayment,
  PortOnePreparePayment,
  PortOneToken,
  ProtOneResponse,
} from '@/interface/payment/port-one.interface';

@Injectable()
export class PortOneProvider {
  private apiClient = axios.create({
    baseURL: 'https://api.iamport.kr',
  });
  constructor(private readonly configService: ConfigService) {}

  async preparePayment(data: PortOnePreparePayment) {
    const response = await this.apiClient.post<ProtOneResponse<PortOnePreparePayment>>('/payments/prepare', data);

    return response.data.response;
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

    const response = await this.apiClient.get<ProtOneResponse<PortOnePayment>>(`/payments/${props.imp_uid}`, {
      headers: this.getHeader(token),
    });

    return response.data.response;
  }

  async getToken(data: PortOneGetToken) {
    const response = await this.apiClient.post<ProtOneResponse<PortOneToken>>('/users/getToken', data);

    return response.data.response.access_token;
  }

  async cancelPayment(data: CancelPortOnePayment) {
    const token = await this.getToken({
      imp_key: this.configService.get('PORT_ONE_IMP_KEY'),
      imp_secret: this.configService.get('PORT_ONE_IMP_SECRET_KEY'),
    });
    const response = await this.apiClient.post<ProtOneResponse<PortOnePayment>>('/payments/cancel', data, {
      headers: this.getHeader(token),
    });

    return response.data;
  }

  getHeader(token: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }
}
