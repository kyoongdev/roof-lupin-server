import type { Admin, Host, User } from '@prisma/client';

export interface ReqUser extends User {
  userType: 'USER';
}

export interface ReqAdmin extends Admin {
  userType: 'ADMIN';
}

export interface ReqHost extends Host {
  userType: 'HOST';
}

export type ReqUserType = ReqUser | ReqAdmin | ReqHost;
