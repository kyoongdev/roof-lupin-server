"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REPORT_ERROR_CODE = exports.REPORT_ANSWER_MUTATION_FORBIDDEN = exports.REPORT_ANSWER_NOT_FOUND = exports.REPORT_UPDATE_FORBIDDEN = exports.REPORT_ALREADY_EXISTS = void 0;
const common_1 = require("@nestjs/common");
exports.REPORT_ALREADY_EXISTS = '신고가 이미 존재합니다.';
exports.REPORT_UPDATE_FORBIDDEN = '자신의 신고만 수정 가능합니다.';
exports.REPORT_ANSWER_NOT_FOUND = '신고 답변을 찾을 수 없습니다.';
exports.REPORT_ANSWER_MUTATION_FORBIDDEN = '자신의 신고 답변만 수정/삭제 가능합니다.';
exports.REPORT_ERROR_CODE = {
    NOT_FOUND: (message = '신고를 찾을 수 없습니다.') => ({
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