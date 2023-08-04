"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESERVATION_ERROR_CODE = exports.RESERVATION_SPACE_NOT_IMMEDIATE = exports.RESERVATION_ALREADY_APPROVED = exports.RESERVATION_COST_BAD_REQUEST = exports.RESERVATION_TIME_BAD_REQUEST = exports.RESERVATION_HOST_FIND_FORBIDDEN = exports.RESERVATION_USER_DELETE_FORBIDDEN = exports.RESERVATION_USER_FIND_FORBIDDEN = exports.RESERVATION_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.RESERVATION_NOT_FOUND = '예약을 찾을 수 없습니다.';
exports.RESERVATION_USER_FIND_FORBIDDEN = '본인의 예약 내역만 조회할 수 있습니다.';
exports.RESERVATION_USER_DELETE_FORBIDDEN = '본인의 예약 내역만 삭제할 수 있습니다.';
exports.RESERVATION_HOST_FIND_FORBIDDEN = '본인의 공간에 대한 예약 내역만 조회할 수 있습니다.';
exports.RESERVATION_TIME_BAD_REQUEST = '예약 시간을 다시 확인해주세요.';
exports.RESERVATION_COST_BAD_REQUEST = '예약 비용을 다시 확인해주세요.';
exports.RESERVATION_ALREADY_APPROVED = '이미 승인된 예약입니다.';
exports.RESERVATION_SPACE_NOT_IMMEDIATE = '즉시 예약이 불가능한 공간입니다.';
exports.RESERVATION_ERROR_CODE = {
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
    BAD_REQUEST: (message = 'BAD_REQUEST') => ({
        code: common_1.HttpStatus.BAD_REQUEST,
        message,
    }),
    INTERNAL_SERVER_ERROR: (message = 'INTERNAL_SERVER_ERROR') => ({
        code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map