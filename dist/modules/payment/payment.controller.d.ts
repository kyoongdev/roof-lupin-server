import { RequestUser } from '@/interface/role.interface';
import { BankCodeDTO, ConfirmTossPaymentDTO, CreatePaymentPayloadDTO, PaymentPayloadDTO, RefundPaymentDTO } from './dto';
import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    validateAccount(): Promise<void>;
    validateAccountCallback(query: any): Promise<{
        asdf: string;
    }>;
    getBankCode(): Promise<BankCodeDTO[]>;
    getPaymentPayload(user: RequestUser, data: CreatePaymentPayloadDTO): Promise<PaymentPayloadDTO>;
    completeTossPayment(data: ConfirmTossPaymentDTO): Promise<string>;
    refundPayment(user: RequestUser, body: RefundPaymentDTO): Promise<string>;
    deletePaymentInfo(user: RequestUser, orderId: string): Promise<void>;
}
