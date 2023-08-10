import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';
import { Jsonwebtoken } from '@/utils/jwt';

import { AdminRepository } from '../admin.repository';

import { AdminAuthController } from './auth.controller';
import { AdminAuthService } from './auth.service';

@Module({
  providers: [EncryptProvider, Jsonwebtoken, AdminRepository, AdminAuthService],
  exports: [EncryptProvider, Jsonwebtoken, AdminRepository, AdminAuthService],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
