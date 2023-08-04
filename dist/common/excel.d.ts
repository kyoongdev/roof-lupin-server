import ExcelJS from 'exceljs';
import type { StatisticExcel } from '@/interface/excel.interface';
export declare class ExcelSheet {
    getDefaultExcelSheet(data: Record<string, any>, convertHeader: (header: string) => string): Array<StatisticExcel>;
    convertExcelFile(rows: StatisticExcel[]): Promise<ExcelJS.Buffer>;
    getExcelFile(data: Record<string, any>, convertHeader: (header: string) => string): Promise<ExcelJS.Buffer>;
}
