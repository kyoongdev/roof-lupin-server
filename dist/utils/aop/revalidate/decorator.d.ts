import { ConfigService } from '@nestjs/config';
import { AOPDecorator, AOPParams } from '@/interface/aop.interface';
import type { RevalidateClientApi } from '@/interface/revalidate.interface';
export declare const REVALIDATE_API: unique symbol;
export declare const RevalidateApi: (data: RevalidateClientApi[]) => MethodDecorator;
export declare class RevalidateApiDecorator implements AOPDecorator {
    private readonly configService;
    constructor(configService: ConfigService);
    execute({ method, metadata }: AOPParams<any, RevalidateClientApi[]>): (...args: any[]) => Promise<any>;
    parseTarget(key: string, index?: number, ...args: any[]): string;
}
