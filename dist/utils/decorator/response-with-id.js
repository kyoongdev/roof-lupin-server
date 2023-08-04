"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseWithId = exports.ReflectTarget = exports.RESPONSE_WITH_ID = void 0;
exports.RESPONSE_WITH_ID = Symbol('RESPONSE_WITH_ID');
exports.ReflectTarget = {
    Controller: 'Controller',
};
function ResponseWithId(target, key, descriptor) {
    Reflect.defineMetadata(exports.RESPONSE_WITH_ID, 'class', descriptor.value);
    return descriptor;
}
exports.ResponseWithId = ResponseWithId;
//# sourceMappingURL=response-with-id.js.map