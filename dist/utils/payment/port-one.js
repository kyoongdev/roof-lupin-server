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
exports.PortOneProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let PortOneProvider = class PortOneProvider {
    constructor(configService) {
        this.configService = configService;
        this.apiClient = axios_1.default.create({
            baseURL: 'https://api.iamport.kr',
        });
    }
    async preparePayment(data) {
        const response = await this.apiClient.post('/payments/prepare', data);
        return response.data.response;
    }
    async completePayment(props) {
        const payment = await this.getPayment(props);
        return payment;
    }
    async getPayment(props) {
        const token = await this.getToken({
            imp_key: this.configService.get('PORT_ONE_IMP_KEY'),
            imp_secret: this.configService.get('PORT_ONE_IMP_SECRET_KEY'),
        });
        const response = await this.apiClient.get(`/payments/${props.imp_uid}`, {
            headers: this.getHeader(token),
        });
        return response.data.response;
    }
    async getToken(data) {
        const response = await this.apiClient.post('/users/getToken', data);
        return response.data.response.access_token;
    }
    async cancelPayment(data) {
        const token = await this.getToken({
            imp_key: this.configService.get('PORT_ONE_IMP_KEY'),
            imp_secret: this.configService.get('PORT_ONE_IMP_SECRET_KEY'),
        });
        const response = await this.apiClient.post('/payments/cancel', data, {
            headers: this.getHeader(token),
        });
        return response.data;
    }
    getHeader(token) {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
    }
};
PortOneProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PortOneProvider);
exports.PortOneProvider = PortOneProvider;
//# sourceMappingURL=port-one.js.map