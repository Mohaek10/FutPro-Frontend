// src/app/models/account.model.ts
export interface Account {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  futcoins: number;
  date_joined: string;
  last_login: string;
  is_admin: boolean;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
}
