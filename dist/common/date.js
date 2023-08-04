"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeek = exports.getTimeDiff = exports.getDateDiff = void 0;
const getDateDiff = (dateOne, dateTwo) => {
    const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
};
exports.getDateDiff = getDateDiff;
const getTimeDiff = (dateOne, dateTwo) => {
    const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600));
    return diffDays;
};
exports.getTimeDiff = getTimeDiff;
const getWeek = (date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();
    return Math.ceil((currentDate + firstDay) / 7);
};
exports.getWeek = getWeek;
//# sourceMappingURL=date.js.map