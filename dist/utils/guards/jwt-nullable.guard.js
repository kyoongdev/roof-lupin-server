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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtNullableAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../../database/prisma.service");
const token_interface_1 = require("../../interface/token.interface");
const jwt_1 = require("../jwt");
let JwtNullableAuthGuard = class JwtNullableAuthGuard {
    constructor(configService, database) {
        this.configService = configService;
        this.database = database;
        this.jwt = new jwt_1.Jsonwebtoken(this.configService);
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authorization = req.headers.authorization;
        if (authorization) {
            const splittedHeader = authorization.split(' ');
            if (splittedHeader.length !== 2 && splittedHeader[0] !== 'Bearer')
                throw new common_1.UnauthorizedException();
            const decoded = this.jwt.verifyJwt(splittedHeader[1]);
            if (decoded instanceof jsonwebtoken_1.JsonWebTokenError)
                throw new common_1.UnauthorizedException('TOKEN_EXPIRED');
            let isExist = null;
            if (decoded.role === token_interface_1.Role.USER)
                isExist = await this.database.user.findUnique({ where: { id: decoded.id } });
            else if (decoded.role === token_interface_1.Role.HOST)
                isExist = await this.database.host.findUnique({ where: { id: decoded.id } });
            else if (decoded.role === token_interface_1.Role.ADMIN)
                isExist = await this.database.admin.findUnique({ where: { id: decoded.id } });
            if (!isExist)
                throw new common_1.ForbiddenException('AUTHORIZATION_FORBIDDEN');
            req.user = {
                ...isExist,
                role: decoded.role,
            };
        }
        return true;
    }
};
JwtNullableAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, prisma_service_1.PrismaService])
], JwtNullableAuthGuard);
exports.JwtNullableAuthGuard = JwtNullableAuthGuard;
//# sourceMappingURL=jwt-nullable.guard.js.map