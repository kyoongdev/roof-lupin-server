"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCKED_TIME_ERROR_CODE = exports.BLOCKED_TIME_MUTATION_FORBIDDEN = exports.BLOCKED_TIME_RESERVATION_EXISTS = exports.BLOCKED_TIME_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.BLOCKED_TIME_NOT_FOUND = '차단 시간을 찾을 수 없습니다.';
exports.BLOCKED_TIME_RESERVATION_EXISTS = '해당 시간에 이미 예약이 있어 차단할 수 없습니다.';
exports.BLOCKED_TIME_MUTATION_FORBIDDEN = '차단 시간을 생성/수정할 권한이 없습니다.';
exports.BLOCKED_TIME_ERROR_CODE = {
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