"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ERROR_CODE = exports.USER_BLOCKED = exports.USER_ALREADY_BLOCKED = exports.HARD_DELETE_FAILED = exports.USER_ALREADY_EXIST = exports.SOCIAL_USER_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.SOCIAL_USER_NOT_FOUND = '해당 소셜 ID에 해당하는 유저가 없습니다.';
exports.USER_ALREADY_EXIST = '이미 존재하는 유저입니다.';
exports.HARD_DELETE_FAILED = '유저를 삭제하는데 실패했습니다.(아직 탈퇴하지 않은 회원입니다.)';
exports.USER_ALREADY_BLOCKED = '이미 차단된 유저입니다.';
exports.USER_BLOCKED = '차단된 유저입니다.';
exports.USER_ERROR_CODE = {
    NOT_FOUND: (message = '유저를 찾을 수 없습니다.') => ({
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