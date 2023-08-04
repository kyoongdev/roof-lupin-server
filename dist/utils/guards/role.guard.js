"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const RoleGuard = (...roles) => {
    let RoleGuardImpl = class RoleGuardImpl {
        async canActivate(context) {
            const req = context.switchToHttp().getRequest();
            if (!req.user)
                throw new common_1.UnauthorizedException('로그인을 진행해주세요.');
            if (!roles.includes(req.user.role)) {
                throw new common_1.ForbiddenException(`${req.user.role}는 사용할 수 없습니다.`);
            }
            return true;
        }
    };
    RoleGuardImpl = __decorate([
        (0, common_1.Injectable)()
    ], RoleGuardImpl);
    return (0, common_1.mixin)(RoleGuardImpl);
};
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map