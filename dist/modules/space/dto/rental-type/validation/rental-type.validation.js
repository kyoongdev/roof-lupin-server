"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalTypeValidation = exports.RentalTypeValidateConstraint = void 0;
const class_validator_1 = require("class-validator");
const validation_1 = require("../../../../../utils/validation");
let RentalTypeValidateConstraint = class RentalTypeValidateConstraint {
    validate(value, validationArguments) {
        if (!Number.isInteger(value))
            return false;
        if (value !== 1 && value !== 2)
            return false;
        return true;
    }
};
RentalTypeValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], RentalTypeValidateConstraint);
exports.RentalTypeValidateConstraint = RentalTypeValidateConstraint;
exports.RentalTypeValidation = (0, validation_1.BaseValidator)(RentalTypeValidateConstraint, '1(시간)과 2(패키지) 중에서만 입력해주세요.');
//# sourceMappingURL=rental-type.validation.js.map