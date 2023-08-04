"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURATION_ERROR_CODE = exports.CURATION_SPACE_ALREADY_EXIST = exports.CURATION_MUTATE_FORBIDDEN = exports.CURATION_SPACE_NOT_FOUND = exports.CURATION_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.CURATION_NOT_FOUND = '큐레이션을 찾을 수 없습니다.';
exports.CURATION_SPACE_NOT_FOUND = '큐레이션 공간을 찾을 수 없습니다.';
exports.CURATION_MUTATE_FORBIDDEN = '본인의 큐레이션만 수정/삭제가 가능합니다.';
exports.CURATION_SPACE_ALREADY_EXIST = '이미 큐레이션에 등록된 공간입니다.';
exports.CURATION_ERROR_CODE = {
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
};
//# sourceMappingURL=errorCode.js.map