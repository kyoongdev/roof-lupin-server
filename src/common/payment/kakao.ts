import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import type {
  KakaoPayApproveRequest,
  KakaoPayApproveResponse,
  KakaoPayCancelRequest,
  KakaoPayCancelResponse,
  KakaoPayOrderDetailRequestQuery,
  KakaoPayOrderDetailResponse,
  KakaoPayReadyRequest,
  KakaoPayReadyResponse,
} from '@/interface/payment/kakao.interface';

@Injectable()
export class KakaoPayProvider {
  private apiClient = axios.create({
    baseURL: 'https://kapi.kakao.com/v1',
  });

  constructor(private readonly configService: ConfigService) {}

  async preparePayment(data: KakaoPayReadyRequest): Promise<KakaoPayReadyResponse> {
    const response = await this.apiClient.post<KakaoPayReadyResponse>('/payment/ready', data, {
      headers: this.getHeader(),
    });

    return response.data;
  }

  async approvePayment(data: KakaoPayApproveRequest): Promise<KakaoPayApproveResponse> {
    const response = await this.apiClient.post<KakaoPayApproveResponse>('/payment/approve', data, {
      headers: this.getHeader(),
    });

    return response.data;
  }

  async getOrder(params: KakaoPayOrderDetailRequestQuery): Promise<KakaoPayOrderDetailResponse> {
    const response = await this.apiClient.get<KakaoPayOrderDetailResponse>('/payment/order', {
      params,
      headers: this.getHeader(),
    });

    return response.data;
  }
  async cancelPayment(data: KakaoPayCancelRequest): Promise<KakaoPayCancelResponse> {
    const response = await this.apiClient.post<KakaoPayCancelResponse>('/payment/cancel', data, {
      headers: this.getHeader(),
    });

    return response.data;
  }

  private getHeader() {
    return {
      Authorization: `KakaoAK ${this.configService.get('KAKA_ADMIN_KEY')}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
  }
}
