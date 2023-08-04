"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermResDecorator = exports.TermResponseTransForm = exports.termEngToKor = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const terms_1 = require("../../common/constants/terms");
const termEngToKor = (name) => {
    console.log(name);
    const term = terms_1.GUEST_TERMS_KOR[name] ? terms_1.GUEST_TERMS_KOR[name] : terms_1.HOST_TERMS_KOR[name] ? terms_1.HOST_TERMS_KOR[name] : null;
    return term;
};
exports.termEngToKor = termEngToKor;
const TermResponseTransForm = () => (0, class_transformer_1.Transform)(({ value }) => (0, exports.termEngToKor)(value));
exports.TermResponseTransForm = TermResponseTransForm;
const TermResDecorator = (nullable = false) => (0, common_1.applyDecorators)((0, exports.TermResponseTransForm)(), (0, swagger_1.ApiProperty)({ type: 'string', description: '이름' }));
exports.TermResDecorator = TermResDecorator;
//# sourceMappingURL=terms.validation.js.map