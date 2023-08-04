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
exports.TossPayProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
const log_1 = require("../../log");
let TossPayProvider = class TossPayProvider {
    constructor(configService) {
        this.configService = configService;
        this.apiClient = axios_1.default.create({
            baseURL: 'https://api.tosspayments.com/v1',
        });
    }
    async getPaymentByPaymentKey(paymentKey) {
        try {
            const response = await this.apiClient.get(`/payments/${paymentKey}`, {
                headers: this.getHeader(),
            });
            return response.data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err);
        }
    }
    async getPaymentByOrderId(orderId) {
        try {
            const response = await this.apiClient.get(`/payments/orders/${orderId}`, {
                headers: this.getHeader(),
            });
            return response.data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err);
        }
    }
    async cancelPaymentByPaymentKey(paymentKey, data) {
        try {
            const response = await this.apiClient.post(`/payments/${paymentKey}/cancel`, data, {
                headers: this.getHeader(),
            });
            return response.data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err);
        }
    }
    async createPayment({ successUrl = `${this.configService.get('CLIENT_URL')}/payments/toss/approve`, failUrl = `${this.configService.get('CLIENT_URL')}/payments/toss/fail`, easyPay = '토스페이', flowMode = 'DIRECT', ...rest }) {
        try {
            const response = await this.apiClient.post('/payments', {
                successUrl,
                failUrl,
                easyPay,
                flowMode,
                cardOptions: {
                    options: (0, lodash_1.range)(1, 11).map((code) => ({
                        cardCompanyCode: code,
                    })),
                },
                ...rest,
            }, {
                headers: this.getHeader(),
            });
            return response.data;
        }
        catch (err) {
            log_1.logger.error(err);
            throw new common_1.InternalServerErrorException(err);
        }
    }
    async confirmPayment(data) {
        try {
            const response = await this.apiClient.post(`/payments/confirm`, data, {
                headers: this.getHeader(),
            });
            return response.data;
        }
        catch (err) {
            log_1.logger.error(err);
            throw new common_1.InternalServerErrorException(err);
        }
    }
    getHeader() {
        const code = Buffer.from(`${this.configService.get('TOSS_PAY_API_SECRET_KEY')}:`, 'utf8').toString('base64');
        return {
            Authorization: `Basic ${code}`,
        };
    }
};
TossPayProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TossPayProvider);
exports.TossPayProvider = TossPayProvider;
//# sourceMappingURL=toss.js.map