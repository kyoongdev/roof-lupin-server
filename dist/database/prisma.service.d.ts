import { INestApplication, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
export type TransactionPrisma = Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly configService;
    private slaveDatabase;
    private readonly logger;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
    routeDatabase(): Promise<void>;
    softDeleteInterceptors(): Promise<void>;
}
