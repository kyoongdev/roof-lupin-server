import { ConfigService } from '@nestjs/config';
import { CancelPortOnePayment, PortOneGetPayment, PortOneGetToken, PortOnePayment, PortOnePreparePayment, ProtOneResponse } from '@/interface/payment/port-one.interface';
export declare class PortOneProvider {
    private readonly configService;
    private apiClient;
    constructor(configService: ConfigService);
    preparePayment(data: PortOnePreparePayment): Promise<PortOnePreparePayment>;
    completePayment(props: PortOneGetPayment): Promise<PortOnePayment>;
    getPayment(props: PortOneGetPayment): Promise<PortOnePayment>;
    getToken(data: PortOneGetToken): Promise<string>;
    cancelPayment(data: CancelPortOnePayment): Promise<ProtOneResponse<PortOnePayment>>;
    getHeader(token: string): {
        'Content-Type': string;
        Authorization: string;
    };
}
