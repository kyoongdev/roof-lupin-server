import { ConfigService } from '@nestjs/config';
import type { Payment, TossCancelPayment, TossConfirmPayment, TossCreatePaymentRequest } from '@/interface/payment/toss.interface';
export declare class TossPayProvider {
    private readonly configService;
    private apiClient;
    constructor(configService: ConfigService);
    getPaymentByPaymentKey(paymentKey: string): Promise<Payment>;
    getPaymentByOrderId(orderId: string): Promise<Payment>;
    cancelPaymentByPaymentKey(paymentKey: string, data: TossCancelPayment): Promise<Payment>;
    createPayment({ successUrl, failUrl, easyPay, flowMode, ...rest }: TossCreatePaymentRequest): Promise<Payment>;
    confirmPayment(data: TossConfirmPayment): Promise<Payment>;
    private getHeader;
}
