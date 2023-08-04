import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/database/prisma.service';
export declare class JwtNullableAuthGuard implements CanActivate {
    private readonly configService;
    private database;
    private readonly jwt;
    constructor(configService: ConfigService, database: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
