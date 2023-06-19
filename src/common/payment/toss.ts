import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import type {
  Payment,
  TossCancelPayment,
  TossConfirmPayment,
  TossCreatePaymentRequest,
} from '@/interface/payment/toss.interface';

@Injectable()
export class TossPayProvider {
  private apiClient = axios.create({
    baseURL: 'https://api.tosspayments.com/v1',
  });
  constructor(private readonly configService: ConfigService) {}

  async getPaymentByPaymentKey(paymentKey: string) {
    try {
      const response = await this.apiClient.get<Payment>(`/payments/${paymentKey}`, {
        headers: this.getHeader(),
      });

      return response.data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getPaymentByOrderId(orderId: string) {
    try {
      const response = await this.apiClient.get<Payment>(`/payments/orders/${orderId}`, {
        headers: this.getHeader(),
      });

      return response.data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async cancelPaymentByPaymentKey(paymentKey: string, data: TossCancelPayment) {
    try {
      const response = await this.apiClient.post<Payment>(`/payments/${paymentKey}/cancel`, data, {
        headers: this.getHeader(),
      });

      return response.data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async createPayment(data: TossCreatePaymentRequest) {
    try {
      const response = await this.apiClient.post<Payment>('/payments', data, {
        headers: this.getHeader(),
      });

      return response.data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async confirmPayment(data: TossConfirmPayment) {
    try {
      const response = await this.apiClient.post<Payment>(`/payments/confirm`, data, {
        headers: this.getHeader(),
      });

      return response.data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  private getHeader() {
    const code = Buffer.from(`${this.configService.get('TOSS_PAY_API_SECRET_KEY')}:`, 'utf8').toString('base64');
    return {
      Authorization: `Basic ${code}`,
    };
  }
}
