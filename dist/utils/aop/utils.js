"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAOPInterceptor = exports.createAOPDecorator = exports.applyAOPFunction = exports.applyMetaData = exports.AOPPrefix = exports.AOPSymbol = void 0;
const common_1 = require("@nestjs/common");
exports.AOPSymbol = Symbol('AOP_DECORATOR');
exports.AOPPrefix = ':AOP';
const applyMetaData = (metaDataKey, metaDataValue) => {
    return (_, __, descriptor) => {
        if (!Reflect.hasMetadata(metaDataKey, descriptor.value)) {
            Reflect.defineMetadata(metaDataKey, [], descriptor.value);
        }
        const metaDataValues = Reflect.getMetadata(metaDataKey, descriptor.value);
        metaDataValues.push({ ...metaDataValue, originalFn: descriptor.value });
        return descriptor;
    };
};
exports.applyMetaData = applyMetaData;
const applyAOPFunction = (_, propertyKey, descriptor) => {
    const originalFn = descriptor.value;
    descriptor.value = function (...args) {
        if (this[exports.AOPSymbol]?.[propertyKey]) {
            return this[exports.AOPSymbol][propertyKey].apply(this, args);
        }
        return originalFn.apply(this, args);
    };
    Object.defineProperty(descriptor.value, 'name', {
        value: originalFn?.name + exports.AOPPrefix,
        writable: false,
    });
    Object.setPrototypeOf(descriptor.value, originalFn);
};
exports.applyAOPFunction = applyAOPFunction;
const createAOPDecorator = (metaDataKey, metadata) => (0, common_1.applyDecorators)((0, exports.applyMetaData)(metaDataKey, {
    metadata,
    aopSymbol: exports.AOPSymbol,
}), exports.applyAOPFunction);
exports.createAOPDecorator = createAOPDecorator;
const createAOPInterceptor = (metaDataKey, metadata) => (0, common_1.applyDecorators)((0, exports.applyMetaData)(metaDataKey, {
    metadata,
    aopSymbol: exports.AOPSymbol,
}), (0, common_1.UseInterceptors)(exports.applyAOPFunction));
exports.createAOPInterceptor = createAOPInterceptor;
//# sourceMappingURL=utils.js.map