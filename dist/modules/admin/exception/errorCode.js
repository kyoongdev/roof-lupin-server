"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_ERROR_CODE = exports.ADMIN_ICON_IN_USE = exports.ADMIN_ICON_NOT_FOUND = exports.ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST = exports.ADMIN_USER_COUPON_ALREADY_EXISTS = exports.ADMIN_SETTLEMENT_ALREADY_EXISTS = exports.ADMIN_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.ADMIN_NOT_FOUND = '관리자를 찾을 수 없습니다.';
exports.ADMIN_SETTLEMENT_ALREADY_EXISTS = '정산 내역이 이미 존재합니다.';
exports.ADMIN_USER_COUPON_ALREADY_EXISTS = '유저 쿠폰이 이미 존재합니다.';
exports.ADMIN_USER_COUPON_DUE_DATE_BAD_REQUEST = '유저 쿠폰 만료일이 잘못되었습니다.';
exports.ADMIN_ICON_NOT_FOUND = '아이콘을 찾을 수 없습니다.';
exports.ADMIN_ICON_IN_USE = '아이콘이 사용중입니다.';
exports.ADMIN_ERROR_CODE = {
    NOT_FOUND: (message = '관리자를 찾을 수 없습니다.') => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
    CONFLICT: (message = 'CONFLICT') => ({
        code: common_1.HttpStatus.CONFLICT,
        message,
    }),
    BAD_REQUEST: (message = 'BAD_REQUEST') => ({
        code: common_1.HttpStatus.BAD_REQUEST,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map