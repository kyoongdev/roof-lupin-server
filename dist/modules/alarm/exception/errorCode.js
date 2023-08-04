"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALARM_ERROR_CODE = exports.ALARM_PUSH_TOKEN_NOT_FOUND = exports.ALARM_MUTATION_FORBIDDEN = exports.ALARM_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.ALARM_NOT_FOUND = '알람을 찾을 수 없습니다.';
exports.ALARM_MUTATION_FORBIDDEN = '알람을 수정할 권한이 없습니다.';
exports.ALARM_PUSH_TOKEN_NOT_FOUND = '푸시 토큰을 찾을 수 없습니다.';
exports.ALARM_ERROR_CODE = {
    BAD_REQUEST: (message = 'Bad Request') => ({
        code: common_1.HttpStatus.BAD_REQUEST,
        message,
    }),
    INTERNAL_SERVER_ERROR: (message = 'Internal Server Error') => ({
        code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message,
    }),
    CONFLICT: (message = 'Conflict') => ({
        code: common_1.HttpStatus.CONFLICT,
        message,
    }),
    FORBIDDEN: (message = 'FORBIDDEN') => ({
        code: common_1.HttpStatus.FORBIDDEN,
        message,
    }),
    NOT_FOUND: (message = 'Not Found') => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map