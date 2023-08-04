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
exports.KakaoPayProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let KakaoPayProvider = class KakaoPayProvider {
    constructor(configService) {
        this.configService = configService;
        this.apiClient = axios_1.default.create({
            baseURL: 'https://kapi.kakao.com/v1',
        });
    }
    async preparePayment({ approval_url = `${this.configService.get('CLIENT_URL')}/payments/kakao/approve`, cancel_url = `${this.configService.get('CLIENT_URL')}/payments/kakao/cancel`, fail_url = `${this.configService.get('CLIENT_URL')}/payments/kakao/fail`, cid = this.configService.get('KAKAO_PAY_CID'), partner_order_id = this.configService.get('KAKAO_PAY_PARTNER_ORDER_ID'), partner_user_id = this.configService.get('KAKAO_PAY_PARTNER_USER_ID'), ...rest }) {
        try {
            const response = await this.apiClient.post('/payment/ready', {
                approval_url,
                cancel_url,
                fail_url,
                cid,
                partner_order_id,
                partner_user_id,
                ...rest,
            }, {
                headers: this.getHeader(),
            });
            return response.data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err);
        }
    }
    async approvePayment({ cid = this.configService.get('KAKAO_PAY_CID'), partner_order_id = this.configService.get('KAKAO_PAY_PARTNER_ORDER_ID'), partner_user_id = this.configService.get('KAKAO_PAY_PARTNER_USER_ID'), ...rest }) {
        const response = await this.apiClient.post('/payment/approve', {
            cid,
            partner_order_id,
            partner_user_id,
            ...rest,
        }, {
            headers: this.getHeader(),
        });
        return response.data;
    }
    async getOrder(params) {
        const response = await this.apiClient.get('/payment/order', {
            params,
            headers: this.getHeader(),
        });
        return response.data;
    }
    async cancelPayment({ cid = this.configService.get('KAKAO_PAY_CID'), ...rest }) {
        const response = await this.apiClient.post('/payment/cancel', {
            cid,
            ...rest,
        }, {
            headers: this.getHeader(),
        });
        return response.data;
    }
    getHeader() {
        return {
            Authorization: `KakaoAK ${this.configService.get('KAKAO_ADMIN_KEY')}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        };
    }
};
KakaoPayProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], KakaoPayProvider);
exports.KakaoPayProvider = KakaoPayProvider;
//# sourceMappingURL=kakao.js.map