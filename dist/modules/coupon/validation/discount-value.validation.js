"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountTypeReqDecorator = exports.DiscountTypeResTransform = exports.DiscountTypeRequestTransform = exports.discountTypeNumberToString = exports.discountTypeStringToNumber = exports.DiscountTypeValidation = exports.DiscountTypeValidateConstraint = exports.DISCOUNT_TYPE_VALUES = exports.DISCOUNT_TYPE_KEYS = exports.DISCOUNT_TYPE = exports.DISCOUNT_TYPE_ENUM = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validation_1 = require("../../../utils/validation");
var DISCOUNT_TYPE_ENUM;
(function (DISCOUNT_TYPE_ENUM) {
    DISCOUNT_TYPE_ENUM[DISCOUNT_TYPE_ENUM["PERCENTAGE"] = 1] = "PERCENTAGE";
    DISCOUNT_TYPE_ENUM[DISCOUNT_TYPE_ENUM["VALUE"] = 2] = "VALUE";
})(DISCOUNT_TYPE_ENUM = exports.DISCOUNT_TYPE_ENUM || (exports.DISCOUNT_TYPE_ENUM = {}));
exports.DISCOUNT_TYPE = {
    PERCENTAGE: 'PERCENTAGE',
    VALUE: 'VALUE',
};
exports.DISCOUNT_TYPE_KEYS = Object.keys(exports.DISCOUNT_TYPE);
exports.DISCOUNT_TYPE_VALUES = Object.values(exports.DISCOUNT_TYPE);
let DiscountTypeValidateConstraint = class DiscountTypeValidateConstraint {
    validate(value) {
        if (value !== DISCOUNT_TYPE_ENUM.PERCENTAGE && value !== DISCOUNT_TYPE_ENUM.VALUE)
            return false;
        return true;
    }
};
DiscountTypeValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], DiscountTypeValidateConstraint);
exports.DiscountTypeValidateConstraint = DiscountTypeValidateConstraint;
exports.DiscountTypeValidation = (0, validation_1.BaseValidator)(DiscountTypeValidateConstraint, 'discountType 옵션은 다음 중 하나여야 합니다: ' + exports.DISCOUNT_TYPE_VALUES.join(', ') + '.');
const discountTypeStringToNumber = (discountType) => {
    if (discountType === exports.DISCOUNT_TYPE.PERCENTAGE) {
        return DISCOUNT_TYPE_ENUM.PERCENTAGE;
    }
    else if (discountType === exports.DISCOUNT_TYPE.VALUE) {
        return DISCOUNT_TYPE_ENUM.VALUE;
    }
    else
        return null;
};
exports.discountTypeStringToNumber = discountTypeStringToNumber;
const discountTypeNumberToString = (discountType) => {
    if (discountType === DISCOUNT_TYPE_ENUM.PERCENTAGE) {
        return exports.DISCOUNT_TYPE.PERCENTAGE;
    }
    else if (discountType === DISCOUNT_TYPE_ENUM.VALUE) {
        return exports.DISCOUNT_TYPE.VALUE;
    }
    else
        return null;
};
exports.discountTypeNumberToString = discountTypeNumberToString;
const DiscountTypeRequestTransform = () => (0, class_transformer_1.Transform)(({ value }) => (0, exports.discountTypeStringToNumber)(value));
exports.DiscountTypeRequestTransform = DiscountTypeRequestTransform;
const DiscountTypeResTransform = () => (0, class_transformer_1.Transform)(({ value }) => (0, exports.discountTypeNumberToString)(value));
exports.DiscountTypeResTransform = DiscountTypeResTransform;
const DiscountTypeReqDecorator = (nullable = false) => (0, common_1.applyDecorators)((0, exports.DiscountTypeRequestTransform)(), (0, exports.DiscountTypeValidation)(), (0, swagger_1.ApiProperty)({
    type: 'string',
    nullable,
    example: exports.DISCOUNT_TYPE_KEYS,
    description: exports.DISCOUNT_TYPE_KEYS.join(','),
}));
exports.DiscountTypeReqDecorator = DiscountTypeReqDecorator;
//# sourceMappingURL=discount-value.validation.js.map