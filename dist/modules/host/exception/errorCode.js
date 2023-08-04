"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOST_ERROR_CODE = exports.HOST_SPACE_HOLIDAY_NOT_FOUND = exports.HOST_TAX_RETURN_FIND_FORBIDDEN = exports.HOST_SPACE_RENTAL_TYPE_BAD_REQUEST = exports.HOST_PHONE_NUMBER_BAD_REQUEST = exports.HOST_SPACE_MUTATION_FORBIDDEN = exports.HOST_SPACE_FIND_FORBIDDEN = exports.QNA_ANSWER_MUTATION_FORBIDDEN = exports.HOST_ACCOUNT_ALREADY_EXIST = exports.HOST_ACCOUNT_NOT_FOUND = exports.HOST_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.HOST_NOT_FOUND = '호스트를 찾을 수 없습니다.';
exports.HOST_ACCOUNT_NOT_FOUND = '호스트 계좌 정보를 찾을 수 없습니다.';
exports.HOST_ACCOUNT_ALREADY_EXIST = '호스트 계좌 정보가 이미 존재합니다.';
exports.QNA_ANSWER_MUTATION_FORBIDDEN = '본인이 작성한 QnA 댓글만 수정/삭제가 가능합니다.';
exports.HOST_SPACE_FIND_FORBIDDEN = '본인이 등록한 공간만 조회가 가능합니다.';
exports.HOST_SPACE_MUTATION_FORBIDDEN = '본인이 등록한 공간만 수정/삭제가 가능합니다.';
exports.HOST_PHONE_NUMBER_BAD_REQUEST = '핸드폰 번호를 확인해주세요.';
exports.HOST_SPACE_RENTAL_TYPE_BAD_REQUEST = '공간 대여 타입을 확인해주세요. (시간 타입은 하나만 입력할 수 있습니다.)';
exports.HOST_TAX_RETURN_FIND_FORBIDDEN = '본인의 세금신고만 조회가 가능합니다.';
exports.HOST_SPACE_HOLIDAY_NOT_FOUND = '공간 휴무일을 찾을 수 없습니다.';
exports.HOST_ERROR_CODE = {
    NOT_FOUND: (message = '호스트를 찾을 수 없습니다.') => ({
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
    BAD_REQUEST: (message = 'BAD_REQUEST') => ({
        code: common_1.HttpStatus.BAD_REQUEST,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map