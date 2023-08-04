"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_INFO_ERROR_CODE = exports.APP_INFO_NOT_FOUND = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
exports.APP_INFO_NOT_FOUND = '앱 정보를 찾을 수 없습니다.';
exports.APP_INFO_ERROR_CODE = {
    NOT_FOUND: (message = 'NOT_FOUND') => ({
        code: cumuco_nestjs_1.HTTP_STATUS.NOT_FOUND,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map