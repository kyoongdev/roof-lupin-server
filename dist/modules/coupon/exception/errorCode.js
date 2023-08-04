"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COUPON_ERROR_CODE = exports.USER_COUPON_NOT_FOUND = exports.COUPON_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.COUPON_NOT_FOUND = '쿠폰을 찾을 수 없습니다.';
exports.USER_COUPON_NOT_FOUND = '유저 쿠폰을 찾을 수 없습니다.';
exports.COUPON_ERROR_CODE = {
    NOT_FOUND: (message = 'NOT_FOUND') => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
    CONFLICT: (message = 'CONFLICT') => ({
        code: common_1.HttpStatus.CONFLICT,
        message,
    }),
    FORBIDDEN: (message = 'FORBIDDEN') => ({
        code: common_1.HttpStatus.FORBIDDEN,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map