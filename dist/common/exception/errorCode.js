"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_ERROR_CODE = exports.ENCRYPT_ERROR = void 0;
const common_1 = require("@nestjs/common");
exports.ENCRYPT_ERROR = '암호화 중 오류가 발생했습니다.';
exports.COMMON_ERROR_CODE = {
    NOT_FOUND: (message = '관리자를 찾을 수 없습니다.') => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
    INTERNAL_SERVER_ERROR: (message = 'INTERNAL_SERVER_ERROR') => ({
        code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map