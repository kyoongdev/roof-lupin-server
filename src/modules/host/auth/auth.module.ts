import { Module } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';
import { Jsonwebtoken } from '@/utils/jwt';

import { HostRepository } from '../host.repository';

import { HostAuthController } from './auth.controller';
import { HostAuthService } from './auth.service';

@Module({
  providers: [HostAuthService, EncryptProvider, Jsonwebtoken, HostRepository],
  exports: [HostAuthService, EncryptProvider, Jsonwebtoken, HostRepository],
  controllers: [HostAuthController],
})
export class HostAuthModule {}
