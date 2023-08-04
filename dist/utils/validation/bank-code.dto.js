"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankCodeReqDecorator = exports.BankCodeRequestTransForm = exports.bankNameToCode = exports.bankCodeToName = exports.BankCodeValidation = exports.BankCodeConstraint = exports.BANK_NAMES = exports.BANK_CODES = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../common/constants");
const base_validator_1 = require("./base-validator");
exports.BANK_CODES = Object.keys(constants_1.BANK_CODE);
exports.BANK_NAMES = Object.values(constants_1.BANK_CODE);
let BankCodeConstraint = class BankCodeConstraint {
    validate(value, validationArguments) {
        if (!exports.BANK_CODES.includes(value))
            return false;
        return true;
    }
};
BankCodeConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], BankCodeConstraint);
exports.BankCodeConstraint = BankCodeConstraint;
exports.BankCodeValidation = (0, base_validator_1.BaseValidator)(BankCodeConstraint, 'bankCode 옵션은 다음 중 하나여야 합니다: ' + exports.BANK_NAMES.join(', ') + '.');
const bankCodeToName = (code) => {
    if (!exports.BANK_CODES.includes(code))
        return null;
    return constants_1.BANK_CODE[code];
};
exports.bankCodeToName = bankCodeToName;
const bankNameToCode = (name) => {
    if (!exports.BANK_NAMES.includes(name))
        return null;
    return exports.BANK_CODES[exports.BANK_NAMES.indexOf(name)];
};
exports.bankNameToCode = bankNameToCode;
const BankCodeRequestTransForm = () => (0, class_transformer_1.Transform)(({ value }) => (0, exports.bankCodeToName)(value));
exports.BankCodeRequestTransForm = BankCodeRequestTransForm;
const BankCodeReqDecorator = (nullable = false) => (0, common_1.applyDecorators)((0, exports.BankCodeValidation)(), (0, swagger_1.ApiProperty)({
    description: '은행 코드',
    type: 'string',
    enum: exports.BANK_CODES,
    nullable,
    example: exports.BANK_CODES.join(' | '),
}));
exports.BankCodeReqDecorator = BankCodeReqDecorator;
//# sourceMappingURL=bank-code.dto.js.map