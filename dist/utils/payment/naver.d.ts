import { ConfigService } from '@nestjs/config';
import { PayReserveParameters } from '@/interface/payment/naver.interface';
import { CreatePaymentDTO } from '@/modules/reservation/dto';
import { RentalTypeDTO } from '@/modules/space/dto/rental-type';
import { CommonUserDTO } from '@/modules/user/dto';
export declare class NaverProvider {
    private readonly configService;
    private apiClient;
    constructor(configService: ConfigService);
    getPayReserveParameters(data: CreatePaymentDTO, rentalTypes: RentalTypeDTO[], user: CommonUserDTO, orderId: string): PayReserveParameters;
    approvePayment(paymentId: string): Promise<void>;
}
