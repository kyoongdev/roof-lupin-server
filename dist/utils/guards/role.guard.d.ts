import { type ExecutionContext } from '@nestjs/common';
import type { RoleType } from '@/interface/token.interface';
export declare const RoleGuard: (...roles: RoleType[]) => import("@nestjs/common").Type<{
    canActivate(context: ExecutionContext): Promise<boolean>;
}>;
