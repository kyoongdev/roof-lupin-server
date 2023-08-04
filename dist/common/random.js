"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = void 0;
const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.getRandom = getRandom;
//# sourceMappingURL=random.js.map