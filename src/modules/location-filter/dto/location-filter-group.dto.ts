import { Property } from 'cumuco-nestjs';

import { LocationFilterDTO, LocationFilterDTOProps } from './location-filter.dto';

export interface LocationFilterGroupDTOProps {
  id: string;
  name: string;
  locationFilters: LocationFilterDTOProps[];
}

export class LocationFilterGroupDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: LocationFilterDTO, description: '세부 필터' } })
  locationFilters: LocationFilterDTO[];

  constructor(props: LocationFilterGroupDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.locationFilters = props.locationFilters.map((locationFilter) => new LocationFilterDTO(locationFilter));
  }
}
