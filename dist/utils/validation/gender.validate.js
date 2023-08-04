"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderReqDecorators = exports.GenderResTransForm = exports.GenderReqTransForm = exports.genderStringToNumber = exports.genderNumberToString = exports.GenderValidation = exports.IsGenderValidateConstraint = exports.GENDER_VALUE = exports.GENDER = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validation_1 = require("./");
exports.GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
};
exports.GENDER_VALUE = Object.keys(exports.GENDER);
let IsGenderValidateConstraint = class IsGenderValidateConstraint {
    validate(value, validationArguments) {
        if (value !== 1 && value !== 2)
            return false;
        return true;
    }
};
IsGenderValidateConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], IsGenderValidateConstraint);
exports.IsGenderValidateConstraint = IsGenderValidateConstraint;
exports.GenderValidation = (0, validation_1.BaseValidator)(IsGenderValidateConstraint, 'MALE과 FEMALE 중에서만 입력해주세요.');
const genderNumberToString = (gender) => {
    if (gender === 1) {
        return exports.GENDER.MALE;
    }
    else if (gender === 2) {
        return exports.GENDER.FEMALE;
    }
    else {
        return null;
    }
};
exports.genderNumberToString = genderNumberToString;
const genderStringToNumber = (gender) => {
    if (gender === exports.GENDER.MALE) {
        return 1;
    }
    else if (gender === exports.GENDER.FEMALE) {
        return 2;
    }
    else {
        return null;
    }
};
exports.genderStringToNumber = genderStringToNumber;
const GenderReqTransForm = () => (0, class_transformer_1.Transform)(({ value }) => {
    if (value === exports.GENDER.MALE) {
        return 1;
    }
    else if (value === exports.GENDER.FEMALE) {
        return 2;
    }
    else {
        return null;
    }
});
exports.GenderReqTransForm = GenderReqTransForm;
const GenderResTransForm = () => (0, class_transformer_1.Transform)(({ value }) => (0, exports.genderNumberToString)(value));
exports.GenderResTransForm = GenderResTransForm;
const GenderReqDecorators = (nullable = false) => (0, common_1.applyDecorators)((0, exports.GenderReqTransForm)(), (0, exports.GenderValidation)(), (0, swagger_1.ApiProperty)({ type: 'string', nullable, example: exports.GENDER_VALUE, description: '성별 : MALE | FEMALE' }));
exports.GenderReqDecorators = GenderReqDecorators;
//# sourceMappingURL=gender.validate.js.map