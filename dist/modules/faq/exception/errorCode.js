"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQ_ERROR_CODE = exports.FAQ_MUTATION_FORBIDDEN = exports.FAQ_NOT_FOUND = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
exports.FAQ_NOT_FOUND = 'FAQ를 찾을 수 없습니다.';
exports.FAQ_MUTATION_FORBIDDEN = '본인의 FAQ만 수정/삭제할 수 없습니다.';
exports.FAQ_ERROR_CODE = {
    NOT_FOUND: (message = 'NOT_FOUND') => ({
        code: cumuco_nestjs_1.HTTP_STATUS.NOT_FOUND,
        message,
    }),
    FORBIDDEN: (message = 'FORBIDDEN') => ({
        code: cumuco_nestjs_1.HTTP_STATUS.FORBIDDEN,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map