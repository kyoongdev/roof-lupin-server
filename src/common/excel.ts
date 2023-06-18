import { Injectable } from '@nestjs/common';

import ExcelJS from 'exceljs';

import type { StatisticExcel } from '@/interface/excel.interface';
@Injectable()
export class ExcelSheet {
  public getDefaultExcelSheet(
    data: Record<string, any>,
    convertHeader: (header: string) => string
  ): Array<StatisticExcel> {
    return Object.entries(data).map(([key, value]) => {
      if (typeof data[key] === 'object') {
        const extraHeaders: string[] = [];
        const extraData: string[] = [];
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
      } else
        return {
          header: convertHeader(key),
          data: [`${value}`],
        };
    });
  }

  async convertExcelFile(rows: StatisticExcel[]): Promise<ExcelJS.Buffer> {
    const workbook = new ExcelJS.Workbook();
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
      } else {
        worksheet.getColumn(index + 1).values = [row.header, ...row.data];
      }
    });

    return await workbook.xlsx.writeBuffer();
  }

  async getExcelFile(data: Record<string, any>, convertHeader: (header: string) => string): Promise<ExcelJS.Buffer> {
    return await this.convertExcelFile(this.getDefaultExcelSheet(data, convertHeader));
  }
}
