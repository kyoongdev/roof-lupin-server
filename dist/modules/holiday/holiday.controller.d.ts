import { FindHolidayDTO, HolidayDTO } from './dto';
import { HolidayService } from './holiday.service';
export declare class HolidayController {
    private readonly holidayService;
    constructor(holidayService: HolidayService);
    getHolidays(query: FindHolidayDTO): Promise<HolidayDTO[]>;
}
