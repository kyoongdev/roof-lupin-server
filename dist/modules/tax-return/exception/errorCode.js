"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAX_RETURN_ERROR_CODE = exports.TAX_RETURN_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.TAX_RETURN_NOT_FOUND = '세금계산서 신고 내역을 찾을 수 없습니다.';
exports.TAX_RETURN_ERROR_CODE = {
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