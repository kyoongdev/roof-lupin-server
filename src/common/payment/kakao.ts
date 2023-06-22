import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async preparePayment({
    approval_url = `${this.configService.get('CLIENT_URL')}/payments/kakao/approve`,
    cancel_url = `${this.configService.get('CLIENT_URL')}/payments/kakao/cancel`,
    fail_url = `${this.configService.get('CLIENT_URL')}/payments/kakao/fail`,
    cid = this.configService.get('KAKAO_PAY_CID'),
    partner_order_id = this.configService.get('KAKAO_PAY_PARTNER_ORDER_ID'),
    partner_user_id = this.configService.get('KAKAO_PAY_PARTNER_USER_ID'),
    ...rest
  }: KakaoPayReadyRequest): Promise<KakaoPayReadyResponse> {
    try {
      const response = await this.apiClient.post<KakaoPayReadyResponse>(
        '/payment/ready',
        {
          approval_url,
          cancel_url,
          fail_url,
          cid,
          partner_order_id,
          partner_user_id,
          ...rest,
        },
        {
          headers: this.getHeader(),
        }
      );

      return response.data;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async approvePayment({
    cid = this.configService.get('KAKAO_PAY_CID'),
    partner_order_id = this.configService.get('KAKAO_PAY_PARTNER_ORDER_ID'),
    partner_user_id = this.configService.get('KAKAO_PAY_PARTNER_USER_ID'),
    ...rest
  }: KakaoPayApproveRequest): Promise<KakaoPayApproveResponse> {
    const response = await this.apiClient.post<KakaoPayApproveResponse>(
      '/payment/approve',
      {
        cid,
        partner_order_id,
        partner_user_id,
        ...rest,
      },
      {
        headers: this.getHeader(),
      }
    );

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
      Authorization: `KakaoAK ${this.configService.get('KAKAO_ADMIN_KEY')}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
  }
}
