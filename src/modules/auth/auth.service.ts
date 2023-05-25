import { Injectable } from '@nestjs/common';

import type { SignOptions } from 'jsonwebtoken';
import { nanoid } from 'nanoid';

import type { TokenPayload, TokenPayloadProps } from '@/interface/token.interface';
import { AdminRepository } from '@/modules/admin/admin.repository';
import { HostRepository } from '@/modules/host/host.repository';
import { UserRepository } from '@/modules/user/user.repository';
import { Jsonwebtoken } from '@/utils/jwt';

@Injectable()
export class AuthService {
  private readonly accessTokenExpiresIn = '2h' as const;
  private readonly refreshTokenExpiresIn = '14d' as const;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly adminRepository: AdminRepository,
    private readonly hostRepository: HostRepository,
    private readonly jwt: Jsonwebtoken
  ) {}

  async adminLogin(email: string, password: string) {
    const admin = await this.adminRepository.findAdminByUserId(email);
    //TODO: password check logic
    // const isMatch = await admin.comparePassword(password);
    // if (!isMatch) {
    //   return null;
    // }
    const token = await this.jwt.signJwt({ id: admin.id, role: 'admin' });
    return token;
  }

  async createTokens<T extends TokenPayloadProps>(value: T, options?: SignOptions) {
    const key = nanoid();
    const accessToken = this.jwt.signJwt<TokenPayload>(
      { ...value, key },
      { ...options, expiresIn: this.accessTokenExpiresIn }
    );
    const refreshToken = this.jwt.signJwt<TokenPayload>(
      { ...value, key },
      { ...options, expiresIn: this.refreshTokenExpiresIn }
    );

    return { accessToken, refreshToken };
  }
}
