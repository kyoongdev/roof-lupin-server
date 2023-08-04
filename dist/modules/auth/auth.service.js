"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cumuco_nestjs_1 = require("cumuco-nestjs");
const nanoid_1 = require("nanoid");
const querystring_1 = __importDefault(require("querystring"));
const encrypt_1 = require("../../common/encrypt");
const fcm_1 = require("../../event/fcm");
const log_1 = require("../../log");
const admin_repository_1 = require("../admin/admin.repository");
const host_repository_1 = require("../host/host.repository");
const user_repository_1 = require("../user/user.repository");
const jwt_1 = require("../../utils/jwt");
const constants_1 = require("../coupon/constants");
const coupon_repository_1 = require("../coupon/coupon.repository");
const dto_1 = require("../user/dto");
const errorCode_1 = require("../user/exception/errorCode");
const user_exception_1 = require("../user/exception/user.exception");
const dto_2 = require("./dto");
const auth_exception_1 = require("./exception/auth.exception");
const errorCode_2 = require("./exception/errorCode");
let AuthService = class AuthService {
    constructor(userRepository, adminRepository, hostRepository, couponRepository, jwt, kakaoService, naverService, appleService, configService, encrypt, fcmEvent) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.hostRepository = hostRepository;
        this.couponRepository = couponRepository;
        this.jwt = jwt;
        this.kakaoService = kakaoService;
        this.naverService = naverService;
        this.appleService = appleService;
        this.configService = configService;
        this.encrypt = encrypt;
        this.fcmEvent = fcmEvent;
        this.accessTokenExpiresIn = '2h';
        this.refreshTokenExpiresIn = '14d';
    }
    async testUserLogin() {
        const user = await this.userRepository.findUserByNickname('user2');
        const tokens = await this.createTokens({ id: user.id, role: 'USER' });
        return tokens;
    }
    async registerNewUserCoupon(userId) {
        const coupon = await this.couponRepository.findCouponByCode(constants_1.COUPON_CODE.REGISTER);
        const usageDateStartAt = new Date();
        usageDateStartAt.setUTCHours(0, 0, 0, 0);
        const current = new Date();
        current.setUTCHours(0, 0, 0, 0);
        const usageDateEndAt = new Date(current.setUTCDate(current.getUTCDate() + coupon.defaultDueDay));
        const user = await this.userRepository.findUser(userId);
        await this.fcmEvent.createCouponDurationAlarm({
            dueDate: usageDateEndAt,
            userId,
            jobId: (0, nanoid_1.nanoid)(),
            nickname: user.nickname,
        });
        await this.couponRepository.createUserCoupon(coupon.id, {
            userId,
            usageDateEndAt,
            usageDateStartAt,
        });
    }
    async socialCallback(props, socialId, path, token, res) {
        const isExistUser = await this.userRepository.checkUserBySocialId(socialId);
        if (!isExistUser) {
            const userId = await this.userRepository.createSocialUser(props);
            await this.registerNewUserCoupon(userId);
        }
        const user = await this.userRepository.findUserBySocialId(socialId);
        await this.userRepository.login(user.id);
        const currentDate = new Date();
        if (user.isBlocked && user.unBlockAt.getTime() > currentDate.getTime()) {
            throw new user_exception_1.UserException(errorCode_1.USER_ERROR_CODE.FORBIDDEN(errorCode_1.USER_BLOCKED));
        }
        const tokens = await this.createTokens({ id: user.id, role: 'USER' });
        const query = querystring_1.default.stringify({
            status: 200,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            [`${path}Token`]: token,
        });
        res.redirect(`${this.configService.get('CLIENT_URL')}/auth/${path}?${query}`);
    }
    async appleLoginCallback(code, res) {
        const result = await this.appleService.getRestCallback(code);
        const user = result;
        this.socialCallback(new dto_1.CreateSocialUserDTO({
            nickname: user.name ?? '',
            name: user.name ?? undefined,
            socialId: `${user.id}`,
            socialType: 'apple',
            email: user.email ?? undefined,
        }), `${user.id}`, 'apple', code, res);
    }
    async getKakaoUser(token) {
        const socialUser = await cumuco_nestjs_1.KakaoLogin.getUser(token);
        const isExistUser = await this.userRepository.checkUserBySocialId(`${Number(socialUser.id)}`);
        if (isExistUser) {
            const tokens = await this.createTokens({ id: isExistUser.id, role: 'USER' });
            return tokens;
        }
        const newUserId = await this.userRepository.createSocialUser(new dto_1.CreateSocialUserDTO().setKakaoUser(socialUser));
        await this.registerNewUserCoupon(newUserId);
        return await this.createTokens({ id: newUserId, role: 'USER' });
    }
    async kakaoLoginCallback(code, res) {
        try {
            const result = await this.kakaoService.getRestCallback(code);
            const { user } = result;
            this.socialCallback(new dto_1.CreateSocialUserDTO().setKakaoUser(user), `${user.id}`, 'kakao', result.token, res);
        }
        catch (err) {
            log_1.logger.log(err);
        }
    }
    async naverLoginCallback(code, res) {
        const result = await this.naverService.getRestCallback(code);
        const { user } = result;
        this.socialCallback(new dto_1.CreateSocialUserDTO({
            nickname: user.name,
            name: user.name,
            socialId: `${user.id}`,
            socialType: 'naver',
            birthDay: user.birthday,
            birthYear: user.birthyear,
            email: user.email,
            gender: user.gender === 'M' ? 1 : user.gender === 'F' ? 2 : undefined,
            phoneNumber: user.mobile,
            profileImage: user.profile_image,
        }), `${user.id}`, 'naver', result.token, res);
    }
    async adminLogin(props) {
        const admin = await this.adminRepository.findAdminByUserId(props.userId);
        const isMatch = this.encrypt.comparePassword(admin.salt, props.password, admin.password);
        if (!isMatch) {
            throw new auth_exception_1.AuthException(errorCode_2.AUTH_ERROR_CODE.BAD_REQUEST(errorCode_2.WRONG_PASSWORD));
        }
        if (!admin.isAccepted) {
            throw new auth_exception_1.AuthException(errorCode_2.AUTH_ERROR_CODE.UNAUTHORIZED(errorCode_2.NOT_ACCEPTED_ADMIN));
        }
        const token = await this.createTokens({ id: admin.id, role: 'ADMIN' });
        return token;
    }
    async adminRegister(props) {
        const isExist = await this.adminRepository.checkAdminByUserId(props.userId);
        if (isExist) {
            throw new auth_exception_1.AuthException(errorCode_2.AUTH_ERROR_CODE.CONFLICT(errorCode_2.ALREADY_EXIST_ADMIN));
        }
        const admin = await this.adminRepository.createAdmin(props);
        const token = await this.createTokens({ id: admin, role: 'ADMIN' });
        return token;
    }
    async hostLogin(props) {
        const host = await this.hostRepository.findHostByEmail(props.email);
        const isMatch = this.encrypt.comparePassword(host.salt, props.password, host.password);
        if (!isMatch) {
            throw new auth_exception_1.AuthException(errorCode_2.AUTH_ERROR_CODE.BAD_REQUEST(errorCode_2.WRONG_PASSWORD));
        }
        const token = await this.createTokens({ id: host.id, role: 'HOST' });
        return token;
    }
    async hostRegister(props) {
        const isExist = await this.hostRepository.checkHostByEmail(props.email);
        if (isExist) {
            throw new auth_exception_1.AuthException(errorCode_2.AUTH_ERROR_CODE.CONFLICT(errorCode_2.ALREADY_EXIST_HOST));
        }
        const host = await this.hostRepository.createHost(props);
        const token = await this.createTokens({ id: host, role: 'HOST' });
        return token;
    }
    sleep(ms) {
        return new Promise((r) => setTimeout(r, ms));
    }
    async refresh(tokens) {
        const { accessToken, refreshToken } = tokens;
        const accessTokenPayload = this.jwt.verifyJwt(accessToken, {
            ignoreExpiration: true,
        });
        const refreshTokenPayload = this.jwt.verifyJwt(refreshToken);
        if (!accessTokenPayload)
            throw new auth_exception_1.AuthException(errorCode_2.AUTH_ERROR_CODE.BAD_REQUEST(errorCode_2.WRONG_ACCESS_TOKEN));
        if (!refreshTokenPayload)
            throw new auth_exception_1.AuthException(errorCode_2.AUTH_ERROR_CODE.BAD_REQUEST(errorCode_2.WRONG_REFRESH_TOKEN));
        if (accessTokenPayload.key !== refreshTokenPayload.key)
            throw new auth_exception_1.AuthException(errorCode_2.AUTH_ERROR_CODE.BAD_REQUEST(errorCode_2.WRONG_KEY));
        if (accessTokenPayload.id !== refreshTokenPayload.id)
            throw new auth_exception_1.AuthException(errorCode_2.AUTH_ERROR_CODE.BAD_REQUEST(errorCode_2.WRONG_ID));
        return this.createTokens({ id: refreshTokenPayload.id, role: refreshTokenPayload.role });
    }
    async createTokens(value, options) {
        const key = (0, nanoid_1.nanoid)();
        const accessToken = this.jwt.signJwt({ ...value, key }, { ...options, expiresIn: this.accessTokenExpiresIn });
        const refreshToken = this.jwt.signJwt({ ...value, key }, { ...options, expiresIn: this.refreshTokenExpiresIn });
        return new dto_2.TokenDTO({ accessToken, refreshToken });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        admin_repository_1.AdminRepository,
        host_repository_1.HostRepository,
        coupon_repository_1.CouponRepository,
        jwt_1.Jsonwebtoken,
        cumuco_nestjs_1.KakaoLogin,
        cumuco_nestjs_1.NaverLogin,
        cumuco_nestjs_1.AppleLogin,
        config_1.ConfigService,
        encrypt_1.EncryptProvider,
        fcm_1.FCMEvent])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map