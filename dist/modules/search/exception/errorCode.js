"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEARCH_ERROR_CODE = exports.SEARCH_RECOMMEND_NOT_FOUND = exports.SEARCH_RECORD_FORBIDDEN = exports.SEARCH_RECORD_NOT_FOUND = void 0;
const cumuco_nestjs_1 = require("cumuco-nestjs");
exports.SEARCH_RECORD_NOT_FOUND = '최근 검색어를 찾을 수 없습니다.';
exports.SEARCH_RECORD_FORBIDDEN = '최근 검색어를 삭제할 수 없습니다.';
exports.SEARCH_RECOMMEND_NOT_FOUND = '추천 검색어를 찾을 수 없습니다.';
exports.SEARCH_ERROR_CODE = {
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