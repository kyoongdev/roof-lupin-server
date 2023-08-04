import { AppleLogin, KakaoLogin, NaverLogin } from 'cumuco-nestjs';
import type { Response as ResponseType } from 'express';
import { CreateAdminDTO } from '../admin/dto/create-admin.dto';
import { CreateHostDTO } from '../host/dto';
import { AuthService } from './auth.service';
import { AdminAuthDTO, AppleLoginCallbackDTO, HostAuthDTO, TokenDTO } from './dto';
import { KakaoSocialUserQuery } from './dto/query';
export declare class AuthController {
    private readonly authService;
    private readonly kakaoService;
    private readonly naverService;
    private readonly appleService;
    constructor(authService: AuthService, kakaoService: KakaoLogin, naverService: NaverLogin, appleService: AppleLogin);
    test(): Promise<TokenDTO>;
    kakaoLogin(res: ResponseType): void;
    kakaoLoginCallback(code: string, res: ResponseType): Promise<void>;
    getKakaoUser(query: KakaoSocialUserQuery): Promise<TokenDTO>;
    naverLogin(res: ResponseType): void;
    naverLoginCallback(code: string, res: ResponseType): Promise<void>;
    appleLogin(res: ResponseType): void;
    appleLoginCallback(body: AppleLoginCallbackDTO, res: ResponseType): Promise<void>;
    refresh(body: TokenDTO): Promise<TokenDTO>;
    adminLogin(body: AdminAuthDTO): Promise<TokenDTO>;
    adminRegister(body: CreateAdminDTO): Promise<TokenDTO>;
    hostLogin(body: HostAuthDTO): Promise<TokenDTO>;
    hostRegister(body: CreateHostDTO): Promise<TokenDTO>;
    refreshToken(body: TokenDTO): Promise<TokenDTO>;
}
