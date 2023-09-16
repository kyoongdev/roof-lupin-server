import type { Admin, Host, User, UserSetting } from '@prisma/client';

export interface RequestUser extends User {
  role: 'USER';
  setting: UserSetting;
}

export interface RequestAdmin extends Admin {
  role: 'ADMIN';
}

export interface RequestHost extends Host {
  role: 'HOST';
}

export type ReqUserType = RequestUser | RequestAdmin | RequestHost;
