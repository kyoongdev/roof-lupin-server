"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPACE_ERROR_CODE = exports.REFUND_POLICY_DAYS_BEFORE_TYPE = exports.REFUND_POLICY_LENGTH = exports.CURRENT_LOCATION_BAD_REQUEST = exports.RENTAL_TYPE_ERROR = exports.RENTAL_TYPE_NOT_FOUND = exports.NOT_INTERESTED = exports.ALREADY_INTERESTED = void 0;
const common_1 = require("@nestjs/common");
exports.ALREADY_INTERESTED = '이미 찜을 했습니다..';
exports.NOT_INTERESTED = '찜을 하지 않았습니다.';
exports.RENTAL_TYPE_NOT_FOUND = '대여 타입을 찾을 수 없습니다.';
exports.RENTAL_TYPE_ERROR = '렌탈 타입에 문제가 있습니다.';
exports.CURRENT_LOCATION_BAD_REQUEST = '현재 위치 입력이 필수 입니다.';
exports.REFUND_POLICY_LENGTH = '환불 정책은 9개이어야 합니다.';
exports.REFUND_POLICY_DAYS_BEFORE_TYPE = '환불 정책의 n일 전 기한 입력이 잘못되었습니다.';
exports.SPACE_ERROR_CODE = {
    NOT_FOUND: (message = '공간을 찾을 수 없습니다.') => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
    CONFLICT: (message = 'CONFLICT') => ({
        code: common_1.HttpStatus.CONFLICT,
        message,
    }),
    INTERNAL_SERVER_ERROR: (message = 'INTERNAL_SERVER_ERROR') => ({
        code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message,
    }),
    BAD_REQUEST: (message = 'BAD_REQUEST') => ({
        code: common_1.HttpStatus.BAD_REQUEST,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map