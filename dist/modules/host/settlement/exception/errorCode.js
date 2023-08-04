"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTLEMENT_ERROR_CODE = exports.SETTLEMENT_HOST_NOT_FOUND = exports.SETTLEMENT_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.SETTLEMENT_NOT_FOUND = '정산을 찾을 수 없습니다.';
exports.SETTLEMENT_HOST_NOT_FOUND = '정산을 생성할 수 없습니다. 호스트를 찾을 수 없습니다.';
exports.SETTLEMENT_ERROR_CODE = {
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
};
//# sourceMappingURL=errorCode.js.map