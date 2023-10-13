export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  HOST: 'HOST',
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];

export interface TokenPayloadProps {
  id: string;
  role: RoleType;
}

export interface TokenPayload {
  id: string;
  role: RoleType;
  key: string;
}

export enum INTERVAL_WEEK {
  EVERY_WEEK = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
}
