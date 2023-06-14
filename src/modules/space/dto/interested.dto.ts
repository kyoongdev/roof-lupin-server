import { Property } from 'wemacu-nestjs';

export interface InterestedDTOProps {
  isInterested: boolean;
}

export class InterestedDTO {
  @Property({ apiProperty: { type: 'boolean', description: '찜 유무' } })
  isInterested: boolean;

  constructor(props: InterestedDTOProps) {
    this.isInterested = props.isInterested;
  }
}
