import type { Admin, Host, User } from '@prisma/client';

export interface RequestUser extends User {
  userType: 'USER';
}

export interface RequestAdmin extends Admin {
  userType: 'ADMIN';
}

export interface RequestHost extends Host {
  userType: 'HOST';
}

export type ReqUserType = RequestUser | RequestAdmin | RequestHost;
