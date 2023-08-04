"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberValidation = exports.PhoneNumberValidateConstraint = void 0;
const class_validator_1 = require("class-validator");
const validation_1 = require("./");
let PhoneNumberValidateConstraint = class PhoneNumberValidateConstraint {
    validate(value, validationArguments) {
        if (value.length !== 11)
            return false;
        return true;
    }
};
PhoneNumberValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], PhoneNumberValidateConstraint);
exports.PhoneNumberValidateConstraint = PhoneNumberValidateConstraint;
exports.PhoneNumberValidation = (0, validation_1.BaseValidator)(PhoneNumberValidateConstraint, "핸드폰 번호는 11자리로 입력해주세요. '-' 제외");
//# sourceMappingURL=phone-number.validation.js.map