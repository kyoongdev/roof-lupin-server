"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TERM_ERROR_CODE = exports.TERM_NOT_FOUND = exports.TERM_ALREADY_EXISTS = void 0;
const common_1 = require("@nestjs/common");
exports.TERM_ALREADY_EXISTS = '이미 약관이 존재합니다.';
exports.TERM_NOT_FOUND = '약관을 찾을 수 없습니다.';
exports.TERM_ERROR_CODE = {
    NOT_FOUND: (message = 'NOT_FOUND') => ({
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