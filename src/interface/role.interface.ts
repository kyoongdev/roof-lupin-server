import type { Admin, Host, User } from '@prisma/client';

export interface RequestUser extends User {
  role: 'USER';
}

export interface RequestAdmin extends Admin {
  role: 'ADMIN';
}

export interface RequestHost extends Host {
  role: 'HOST';
}

export type ReqUserType = RequestUser | RequestAdmin | RequestHost;
