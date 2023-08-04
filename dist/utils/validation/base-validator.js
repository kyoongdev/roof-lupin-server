"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValidator = void 0;
const class_validator_1 = require("class-validator");
function BaseValidator(validator, message = 'Invalid Request') {
    return (validationOptions) => {
        return function (object, propertyName) {
            (0, class_validator_1.registerDecorator)({
                target: object.constructor,
                propertyName: propertyName,
                options: {
                    ...validationOptions,
                    message,
                },
                constraints: [],
                validator,
            });
        };
    };
}
exports.BaseValidator = BaseValidator;
//# sourceMappingURL=base-validator.js.map