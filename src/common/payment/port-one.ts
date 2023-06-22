import { Injectable } from '@nestjs/common';

import axios from 'axios';

import { PortOneGetPayment } from '@/interface/payment/port-one.interface';

@Injectable()
export class PortOneProvider {
  private apiClient = axios.create({
    baseURL: 'https://api.iamport.kr/payments',
  });

  async getPayment(props: PortOneGetPayment) {
    const response = await this.apiClient.get(`/${props.imp_uid}`);
  }

  getHeader(token: string) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }
}
