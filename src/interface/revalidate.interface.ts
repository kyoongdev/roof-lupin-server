export type RevalidateApiKey =
  | '/home'
  | '/home/categories'
  | '/home/contents'
  | 'home'
  | `/spaces/:spaceId/detail`
  | `/rental-types/:spaceId/detail`
  | 'spaces'
  | '/main';

export interface RevalidateClientApi {
  key: RevalidateApiKey;
  index?: number;
}
