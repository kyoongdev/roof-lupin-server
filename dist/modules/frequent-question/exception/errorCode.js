"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FREQUENT_QUESTION_ERROR_CODE = exports.FREQUENT_QUESTION_NOT_FOUND = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
exports.FREQUENT_QUESTION_NOT_FOUND = '자주 묻는 질문을 찾을 수 없습니다.';
exports.FREQUENT_QUESTION_ERROR_CODE = {
    NOT_FOUND: (message = 'NOT_FOUND') => ({
        code: cumuco_nestjs_1.HTTP_STATUS.NOT_FOUND,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map