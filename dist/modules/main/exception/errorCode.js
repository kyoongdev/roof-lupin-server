"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIN_ERROR_CODE = exports.SLOGAN_NO_DEFAULT = exports.MAIN_IMAGE_NO_DEFAULT = exports.SLOGAN_NOT_FOUND = exports.MAIN_IMAGE_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.MAIN_IMAGE_NOT_FOUND = '홈 화면 이미지를 찾을 수 없습니다.';
exports.SLOGAN_NOT_FOUND = '슬로건을 찾을 수 없습니다.';
exports.MAIN_IMAGE_NO_DEFAULT = '기본 설정된 홈 이미지가 없습니다.';
exports.SLOGAN_NO_DEFAULT = '기본 설정된 슬로건이 없습니다.';
exports.MAIN_ERROR_CODE = {
    NOT_FOUND: (message = 'NOT_FOUND') => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
    CONFLICT: (message = 'CONFLICT') => ({
        code: common_1.HttpStatus.CONFLICT,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map