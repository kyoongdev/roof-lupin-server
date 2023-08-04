"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_ERROR_CODE = exports.CONTENT_CATEGORY_SPACE_NOT_FOUND = exports.CONTENT_CATEGORY_NOT_FOUND = exports.HOME_CATEGORY_ICON_PATH_BAD_REQUEST = exports.HOME_CATEGORY_COUNT = exports.CATEGORY_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.CATEGORY_NOT_FOUND = '카테고리를 찾을 수 없습니다.';
exports.HOME_CATEGORY_COUNT = '홈 카테고리는 5개까지만 등록할 수 있습니다.';
exports.HOME_CATEGORY_ICON_PATH_BAD_REQUEST = '홈 카테고리는 iconPath가 필수입니다.';
exports.CONTENT_CATEGORY_NOT_FOUND = '콘텐츠 카테고리를 찾을 수 없습니다.';
exports.CONTENT_CATEGORY_SPACE_NOT_FOUND = '콘텐츠 카테고리의 공간을 찾을 수 없습니다.';
exports.CATEGORY_ERROR_CODE = {
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