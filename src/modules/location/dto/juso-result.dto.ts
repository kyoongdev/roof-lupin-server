import { Property } from 'cumuco-nestjs';

import { AddressResult } from '@/interface/location.interface';

import { JusoCommonDTO } from './juso-common.dto';
import { JusoDTO } from './juso.dto';

export class JusoResultDTO {
  @Property({ apiProperty: { type: JusoCommonDTO } })
  common: JusoCommonDTO;

  @Property({ apiProperty: { type: JusoDTO, isArray: true } })
  juso: JusoDTO[];

  constructor({ results }: AddressResult) {
    this.common = new JusoCommonDTO(results.common);
    this.juso = results.juso?.map((juso) => new JusoDTO(juso));
  }
}
