"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalTypeReqDecorator = exports.RentalTypeResTransForm = exports.RentalTypeRequestTransForm = exports.rentalTypeNumberToString = exports.rentalTypeStringToNumber = exports.RentalTypeValidation = exports.RentalTypeValidateConstraint = exports.RENTAL_TYPE_VALUES = exports.RENTAL_TYPE_KEYS = exports.RENTAL_TYPE_ENUM = exports.RENTAL_TYPE = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_validator_1 = require("../../../../utils/validation/base-validator");
exports.RENTAL_TYPE = {
    TIME: 'TIME',
    PACKAGE: 'PACKAGE',
};
var RENTAL_TYPE_ENUM;
(function (RENTAL_TYPE_ENUM) {
    RENTAL_TYPE_ENUM[RENTAL_TYPE_ENUM["TIME"] = 1] = "TIME";
    RENTAL_TYPE_ENUM[RENTAL_TYPE_ENUM["PACKAGE"] = 2] = "PACKAGE";
})(RENTAL_TYPE_ENUM = exports.RENTAL_TYPE_ENUM || (exports.RENTAL_TYPE_ENUM = {}));
exports.RENTAL_TYPE_KEYS = Object.keys(exports.RENTAL_TYPE);
exports.RENTAL_TYPE_VALUES = Object.values(exports.RENTAL_TYPE);
let RentalTypeValidateConstraint = class RentalTypeValidateConstraint {
    validate(value, validationArguments) {
        if (value !== RENTAL_TYPE_ENUM.TIME && value !== RENTAL_TYPE_ENUM.PACKAGE)
            return false;
        return true;
    }
};
RentalTypeValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], RentalTypeValidateConstraint);
exports.RentalTypeValidateConstraint = RentalTypeValidateConstraint;
exports.RentalTypeValidation = (0, base_validator_1.BaseValidator)(RentalTypeValidateConstraint, 'rentalType 옵션은 다음 중 하나여야 합니다: ' + exports.RENTAL_TYPE_VALUES.join(', ') + '.');
const rentalTypeStringToNumber = (rentalType) => {
    if (rentalType === exports.RENTAL_TYPE.TIME) {
        return RENTAL_TYPE_ENUM.TIME;
    }
    else if (rentalType === exports.RENTAL_TYPE.PACKAGE) {
        return RENTAL_TYPE_ENUM.PACKAGE;
    }
    else
        return null;
};
exports.rentalTypeStringToNumber = rentalTypeStringToNumber;
const rentalTypeNumberToString = (rentalType) => {
    if (rentalType === RENTAL_TYPE_ENUM.TIME) {
        return exports.RENTAL_TYPE.TIME;
    }
    else if (rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
        return exports.RENTAL_TYPE.PACKAGE;
    }
    else
        return null;
};
exports.rentalTypeNumberToString = rentalTypeNumberToString;
const RentalTypeRequestTransForm = () => (0, class_transformer_1.Transform)(({ value }) => (0, exports.rentalTypeStringToNumber)(value));
exports.RentalTypeRequestTransForm = RentalTypeRequestTransForm;
const RentalTypeResTransForm = () => (0, class_transformer_1.Transform)(({ value }) => (0, exports.rentalTypeNumberToString)(value));
exports.RentalTypeResTransForm = RentalTypeResTransForm;
const RentalTypeReqDecorator = (nullable = false) => (0, common_1.applyDecorators)((0, exports.RentalTypeRequestTransForm)(), (0, exports.RentalTypeValidation)(), (0, swagger_1.ApiProperty)({
    type: 'string',
    nullable,
    example: exports.RENTAL_TYPE_KEYS,
    description: exports.RENTAL_TYPE_KEYS.join(','),
}));
exports.RentalTypeReqDecorator = RentalTypeReqDecorator;
//# sourceMappingURL=rental-type.validation.js.map