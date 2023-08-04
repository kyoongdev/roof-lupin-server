"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordLengthValidation = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const WordLengthValidateFunc = (...lengths) => {
    let WordLengthValidateConstraint = class WordLengthValidateConstraint {
        validate(value, validationArguments) {
            if (!lengths.includes(value.length))
                return false;
            return true;
        }
    };
    WordLengthValidateConstraint = __decorate([
        (0, class_validator_1.ValidatorConstraint)()
    ], WordLengthValidateConstraint);
    return (0, common_1.mixin)(WordLengthValidateConstraint);
};
const WordLengthValidation = (...length) => {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: `길이는 ${length.join(',')} 중 하나입니다.`,
            },
            constraints: [],
            validator: WordLengthValidateFunc(...length),
        });
    };
};
exports.WordLengthValidation = WordLengthValidation;
//# sourceMappingURL=word-length.validation.js.map