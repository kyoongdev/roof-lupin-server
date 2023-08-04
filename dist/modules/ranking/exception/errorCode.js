"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RANKING_ERROR_CODE = exports.RANKING_SPACE_NOT_FOUND = exports.RANKING_NOT_FOUND = void 0;
const common_1 = require("@nestjs/common");
exports.RANKING_NOT_FOUND = '랭킹을 찾을 수 없습니다.';
exports.RANKING_SPACE_NOT_FOUND = '랭킹 장소를 찾을 수 없습니다.';
exports.RANKING_ERROR_CODE = {
    NOT_FOUND: (message = 'NOT_FOUND') => ({
        code: common_1.HttpStatus.NOT_FOUND,
        message,
    }),
    FORBIDDEN: (message = 'FORBIDDEN') => ({
        code: common_1.HttpStatus.FORBIDDEN,
        message,
    }),
};
//# sourceMappingURL=errorCode.js.map