import { ConfigService } from '@nestjs/config';
import type { KakaoPayApproveRequest, KakaoPayApproveResponse, KakaoPayCancelRequest, KakaoPayCancelResponse, KakaoPayOrderDetailRequestQuery, KakaoPayOrderDetailResponse, KakaoPayReadyRequest, KakaoPayReadyResponse } from '@/interface/payment/kakao.interface';
export declare class KakaoPayProvider {
    private readonly configService;
    private apiClient;
    constructor(configService: ConfigService);
    preparePayment({ approval_url, cancel_url, fail_url, cid, partner_order_id, partner_user_id, ...rest }: KakaoPayReadyRequest): Promise<KakaoPayReadyResponse>;
    approvePayment({ cid, partner_order_id, partner_user_id, ...rest }: KakaoPayApproveRequest): Promise<KakaoPayApproveResponse>;
    getOrder(params: KakaoPayOrderDetailRequestQuery): Promise<KakaoPayOrderDetailResponse>;
    cancelPayment({ cid, ...rest }: KakaoPayCancelRequest): Promise<KakaoPayCancelResponse>;
    private getHeader;
}
