"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANNOUNCEMENT_ERROR_CODE = exports.ANNOUNCEMENT_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.ANNOUNCEMENT_NOT_FOUND = '공지사항을 찾을 수 없습니다.';
exports.ANNOUNCEMENT_ERROR_CODE = {
    NOT_FOUND: (message = exports.ANNOUNCEMENT_NOT_FOUND) => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map