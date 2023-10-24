import { Property } from 'cumuco-nestjs';

import { checkIsAfterDate, checkIsSameDate, getDateDiff } from '@/common/date';
import { OpenHourDTO } from '@/modules/host/dto/openHour';

import { TimeCostInfoDTO, TimeCostInfoDTOProps } from './time-cost-info.dto';

export interface PossibleTimeCostInfoDTOProps extends TimeCostInfoDTOProps {
  isPossible: boolean;
}

export class PossibleTimeCostInfoDTO extends TimeCostInfoDTO {
  @Property({ apiProperty: { type: 'boolean', description: '예약 가능 여부' } })
  isPossible: boolean;

  constructor(props: PossibleTimeCostInfoDTOProps) {
    super(props);
    this.isPossible = props.isPossible;
  }

  checkIsAfter(currentDate: Date, targetDate: Date) {
    const dateDiff = getDateDiff(targetDate, currentDate);
    const isAfter = checkIsAfterDate(targetDate, currentDate) && currentDate.getHours() < 9;
    const time = dateDiff === 1 && !isAfter ? currentDate.getHours() + 15 : currentDate.getHours();

    return checkIsSameDate(currentDate, targetDate) || (dateDiff === 1 && !isAfter)
      ? !(this.time <= time)
      : isAfter
      ? false
      : true;
  }

  checkIsImpossibleTime(time: number) {
    if (this.time === time) {
      this.isPossible = false;
    }
  }
  checkIsOpenTime(openHour: OpenHourDTO) {
    const openStart = openHour.startAt;
    const openEnd = openHour.endAt - 1;
    if (!(this.time >= openStart && this.time < openEnd)) {
      this.isPossible = false;
    }
  }
}
