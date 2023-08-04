"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QNA_ERROR_CODE = exports.QNA_MUTATION_FORBIDDEN = void 0;
const common_1 = require("@nestjs/common");
exports.QNA_MUTATION_FORBIDDEN = '본인의 QnA만 수정/삭제가 가능합니다.';
exports.QNA_ERROR_CODE = {
    NOT_FOUND: (message = '신고를 찾을 수 없습니다.') => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
    FORBIDDEN: (message = 'FORBIDDEN') => ({
        code: common_1.HttpStatus.FORBIDDEN,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map