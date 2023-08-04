import { ConfigService } from '@nestjs/config';
export declare class FinanceProvider {
    private readonly configService;
    private apiClient;
    constructor(configService: ConfigService);
    getCode(): Promise<any>;
    getToken(): Promise<void>;
    getHeaders(token: string): {
        Authorization: string;
    };
}
