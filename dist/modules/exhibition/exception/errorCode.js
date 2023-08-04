"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXHIBITION_ERROR_CODE = exports.EXHIBITION_SPACE_NOT_FOUND = exports.EXHIBITION_NOT_FOUND = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
exports.EXHIBITION_NOT_FOUND = '기획전을 찾을 수 없습니다.';
exports.EXHIBITION_SPACE_NOT_FOUND = '기획전에 해당하는 공간을 찾을 수 없습니다.';
exports.EXHIBITION_ERROR_CODE = {
    NOT_FOUND: (message = 'NOT_FOUND') => ({
        code: cumuco_nestjs_1.HTTP_STATUS.NOT_FOUND,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map