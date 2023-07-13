import { CommonSpace } from './space.interface';

export interface CommonCurationSpace {
  orderNo?: number;
  spaceId: string;
  curationId: string;
  space: CommonSpace;
}
