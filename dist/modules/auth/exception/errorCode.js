"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_ERROR_CODE = exports.NOT_ACCEPTED_ADMIN = exports.WRONG_PASSWORD = exports.ALREADY_EXIST_HOST = exports.ALREADY_EXIST_ADMIN = exports.ALREADY_EXIST_USER = exports.SOCIAL_USER_ERROR = exports.CALLBACK_ERROR = exports.WRONG_ID = exports.WRONG_KEY = exports.WRONG_REFRESH_TOKEN = exports.WRONG_ACCESS_TOKEN = void 0;
const common_1 = require("@nestjs/common");
exports.WRONG_ACCESS_TOKEN = '잘못된 액세스 토큰입니다.';
exports.WRONG_REFRESH_TOKEN = '잘못된 리프레쉬 토큰입니다.';
exports.WRONG_KEY = '토큰 key 값이 일치하지 않습니다.';
exports.WRONG_ID = '토큰 id 값이 일치하지 않습니다.';
exports.CALLBACK_ERROR = '소셜 로그인 중 문제가 발생했습니다.';
exports.SOCIAL_USER_ERROR = '코드 혹은 토큰이 잘못되었습니다.';
exports.ALREADY_EXIST_USER = '이미 존재하는 유저입니다.';
exports.ALREADY_EXIST_ADMIN = '이미 존재하는 관리자입니다.';
exports.ALREADY_EXIST_HOST = '이미 존재하는 호스트입니다.';
exports.WRONG_PASSWORD = '비밀번호가 일치하지 않습니다.';
exports.NOT_ACCEPTED_ADMIN = '승인되지 않은 관리자입니다.';
exports.AUTH_ERROR_CODE = {
    BAD_REQUEST: (message = 'Bad Request') => ({
        code: common_1.HttpStatus.BAD_REQUEST,
        message,
    }),
    INTERNAL_SERVER_ERROR: (message = 'Internal Server Error') => ({
        code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message,
    }),
    CONFLICT: (message = 'Conflict') => ({
        code: common_1.HttpStatus.CONFLICT,
        message,
    }),
    UNAUTHORIZED: (message = 'Unauthorized') => ({
        code: common_1.HttpStatus.UNAUTHORIZED,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map