import { Injectable } from '@nestjs/common';

import { EncryptProvider } from '@/common/encrypt';
import { TokenPayload } from '@/interface/token.interface';
import { AdminAuthDTO, TokenDTO } from '@/modules/auth/dto';
import { AuthException } from '@/modules/auth/exception/auth.exception';
import {
  ALREADY_EXIST_ADMIN,
  AUTH_ERROR_CODE,
  NOT_ACCEPTED_ADMIN,
  WRONG_ACCESS_TOKEN,
  WRONG_ID,
  WRONG_KEY,
  WRONG_PASSWORD,
  WRONG_REFRESH_TOKEN,
} from '@/modules/auth/exception/errorCode';
import { Jsonwebtoken } from '@/utils/jwt';

import { AdminRepository } from '../admin.repository';
import { CreateAdminDTO } from '../dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly encrypt: EncryptProvider,
    private readonly jwt: Jsonwebtoken,
    private readonly adminRepository: AdminRepository
  ) {}
  async adminLogin(props: AdminAuthDTO) {
    const admin = await this.adminRepository.findAdminByUserId(props.userId);

    const isMatch = this.encrypt.comparePassword(admin.salt, props.password, admin.password);
    if (!isMatch) {
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_PASSWORD));
    }

    if (!admin.isAccepted) {
      throw new AuthException(AUTH_ERROR_CODE.UNAUTHORIZED(NOT_ACCEPTED_ADMIN));
    }

    const token = await this.jwt.createTokens({ id: admin.id, role: 'ADMIN' });
    return token;
  }

  async adminRegister(props: CreateAdminDTO) {
    const isExist = await this.adminRepository.checkAdminByUserId(props.userId);
    if (isExist) {
      throw new AuthException(AUTH_ERROR_CODE.CONFLICT(ALREADY_EXIST_ADMIN));
    }

    const admin = await this.adminRepository.createAdmin(props);
    const token = await this.jwt.createTokens({ id: admin, role: 'ADMIN' });
    return token;
  }

  async refresh(tokens: TokenDTO) {
    const { accessToken, refreshToken } = tokens;
    const accessTokenPayload = this.jwt.verifyJwt<TokenPayload>(accessToken, {
      ignoreExpiration: true,
    }) as TokenPayload | null | undefined;
    const refreshTokenPayload = this.jwt.verifyJwt<TokenPayload>(refreshToken) as TokenPayload | null | undefined;

    if (!accessTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ACCESS_TOKEN));
    if (!refreshTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_REFRESH_TOKEN));

    if (accessTokenPayload.key !== refreshTokenPayload.key)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_KEY));
    if (accessTokenPayload.id !== refreshTokenPayload.id)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ID));

    return this.jwt.createTokens({ id: refreshTokenPayload.id, role: refreshTokenPayload.role });
  }
}
