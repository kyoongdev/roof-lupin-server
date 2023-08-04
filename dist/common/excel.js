"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelSheet = void 0;
const common_1 = require("@nestjs/common");
const exceljs_1 = __importDefault(require("exceljs"));
let ExcelSheet = class ExcelSheet {
    getDefaultExcelSheet(data, convertHeader) {
        return Object.entries(data).map(([key, value]) => {
            if (typeof data[key] === 'object') {
                const extraHeaders = [];
                const extraData = [];
                Object.entries(data[key]).forEach(([header, value]) => {
                    extraHeaders.push(convertHeader(header));
                    extraData.push(`${value}`);
                });
                return {
                    header: convertHeader(key),
                    data: [`${value}`],
                    extra: {
                        headers: extraHeaders,
                        extraData,
                        title: convertHeader(key),
                    },
                };
            }
            else
                return {
                    header: convertHeader(key),
                    data: [`${value}`],
                };
        });
    }
    async convertExcelFile(rows) {
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet();
        rows.forEach((row, index) => {
            if (row.extra) {
                const length = row.extra.headers.length;
                row.extra.headers.forEach((header, headerIndex) => {
                    worksheet.getColumn(index * length + headerIndex - length).values = [
                        row.extra?.title,
                        header,
                        row.extra?.extraData[headerIndex],
                    ];
                });
                worksheet.mergeCells(1, index * length - length, 1, index * length - 1);
            }
            else {
                worksheet.getColumn(index + 1).values = [row.header, ...row.data];
            }
        });
        return await workbook.xlsx.writeBuffer();
    }
    async getExcelFile(data, convertHeader) {
        return await this.convertExcelFile(this.getDefaultExcelSheet(data, convertHeader));
    }
};
ExcelSheet = __decorate([
    (0, common_1.Injectable)()
], ExcelSheet);
exports.ExcelSheet = ExcelSheet;
//# sourceMappingURL=excel.js.map