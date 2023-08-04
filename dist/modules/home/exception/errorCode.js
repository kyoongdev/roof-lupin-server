"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOME_ERROR_CODE = exports.HOME_AT_LEAST_ONE_TARGET = exports.HOME_CONTENTS_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.HOME_CONTENTS_NOT_FOUND = '홈 화면 컨텐츠를 찾을 수 없습니다.';
exports.HOME_AT_LEAST_ONE_TARGET = '하나의 대상이 필요합니다.';
exports.HOME_ERROR_CODE = {
    NOT_FOUND: (message = 'NOT_FOUND') => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
    CONFLICT: (message = 'CONFLICT') => ({
        code: common_1.HttpStatus.CONFLICT,
        message,
    }),
    BAD_REQUEST: (message = 'BAD_REQUEST') => ({
        code: common_1.HttpStatus.BAD_REQUEST,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map